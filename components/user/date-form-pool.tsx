"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { PropertySchema } from "@/schemas";

const FormSchema = z.object({
  dob: z.date().nullable().optional(),
});

const DatePickerForm = ({
  property,
}: {
  property: z.infer<typeof PropertySchema>;
}) => {
  const router = useRouter();
  const [test, setTest] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [choosenDateL, setChoosenDate] = useState("");
  const availabilityArray = property?.availability;

  useEffect(() => {
    const storedTest = localStorage.getItem("shoppingCard");
    const date = localStorage.getItem("choosenDate");

    storedTest && setTest(JSON.parse(storedTest));
    date && setChoosenDate(date);
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: any) {
    const choosenDate = data.dob
      ? data.dob.toLocaleDateString("en-GB")
      : choosenDateL;
    const newAvailability = property.availability.filter(
      (item) => item.date === choosenDate
    );
    const newProperty = { ...property, availability: newAvailability };

    const newTest = [...test, newProperty];
    localStorage.setItem("shoppingCard", JSON.stringify(newTest));

    router.push("/shoppingCard");
  }

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const foundItem = (formattedDate: string) => {
    const theItem = availabilityArray.find(
      (item) => `${item.date}` === formattedDate
    );
    return theItem;
  };

  const disabledDays = (date: Date) => {
    const originalDate = date;
    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const item = foundItem(formattedDate);

    let current = new Date();
    current.setHours(0, 0, 0, 0);

    if (item?.free === undefined) {
      return (
        date < current ||
        !availabilityArray.find((item) => `${item.date}` === formattedDate)
      );
    }

    return (
      date < current ||
      !availabilityArray.find((item) => `${item.date}` === formattedDate) ||
      item.free < 1
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <Popover open={isOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      onClick={handleOnClick}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>{choosenDateL || "pick a date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[300px] p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      setIsOpen(false);
                      field.onChange(date);
                    }}
                    disabled={(date) => disabledDays(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add to Shopping Card</Button>
      </form>
    </Form>
  );
};

export default DatePickerForm;
