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

const FormSchema = z.object({
  dob: z.date({
    required_error: "Please select a date.",
  }),
});

const DatePickerForm = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const currentDate = new Date();
    form.setValue("dob", currentDate);
  }, [form]);

  function onSubmit(data: any) {
    const choosenDate = data.dob.toLocaleDateString("en-GB");
    localStorage.setItem("choosenDate", choosenDate);
    router.push("/discover");
  }

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex  items-center "
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col w-[200px]  ">
              <Popover open={isOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "font-normal mt-8 text-lg h-12 rounded-none rounded-l-lg ",
                        !field.value && "text-muted-foreground"
                      )}
                      onClick={handleOnClick}
                    >
                      <CalendarIcon className="mr-auto h-7 w-7 opacity-50" />

                      {field.value ? (
                        format(field.value, "d MMMM")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[250px] p-0 " align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      setIsOpen(false);
                      field.onChange(date);
                    }}
                    disabled={(date) => {
                      let current = new Date();
                      current.setHours(0, 0, 0, 0);
                      return date < current;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-cyan-500 h-12 rounded-none rounded-r-lg"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default DatePickerForm;
