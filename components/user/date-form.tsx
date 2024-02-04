"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, set } from "date-fns";
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
import * as Pop from "@radix-ui/react-popover";

const FormSchema = z.object({
  dob: z.date({
    required_error: "Please select a date.",
  }),
});

const DatePickerForm = ({ property }: any) => {
  const router = useRouter();
  const [test, setTest] = useState([]);
  const dates = property?.availability.map((item) => item.date);

  useEffect(() => {
    const storedTest = localStorage.getItem("shoppingCard");
    if (storedTest) {
      setTest(JSON.parse(storedTest));
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const choosenDate = data.dob.toLocaleDateString("en-GB");
    const newAvailability = property.availability.filter(
      (item) => item.date === choosenDate
    );
    const newProperty = { ...property, availability: newAvailability };

    setTest((prevTest) => {
      const newTest = [...prevTest, newProperty];
      localStorage.setItem("shoppingCard", JSON.stringify(newTest));
      return newTest;
    });
    router.push("/shoppingCard");
  }

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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <Pop.Close>
                  {" "}
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const originalDate = date;
                        const day = originalDate
                          .getDate()
                          .toString()
                          .padStart(2, "0");
                        const month = (originalDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = originalDate.getFullYear();

                        const formattedDate = `${day}/${month}/${year}`;
                        return (
                          date < new Date() ||
                          !dates.find((item) => `${item}` === formattedDate)
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Pop.Close>
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
