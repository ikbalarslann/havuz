"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscountSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import discountArray from "@/data/discount";

export const DiscountForm = ({ setDiscount, setCode }: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DiscountSchema>>({
    resolver: zodResolver(DiscountSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DiscountSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const result = discountArray.find((item) => item.code === values.code);
      if (result) {
        setDiscount(true);
        setCode(values.code);
        setSuccess("10%  Discount applied!");
      } else {
        setDiscount(false);
        setError("Discount code not found");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-white p-2 m-1 flex flex-col justify-end "
      >
        <div className="mb-4   ">
          <hr />
          <>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex justify-center items-center px-6">
                  <FormLabel className="min-w-[110px] pt-2 ">Code :</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your discount code"
                      type="text"
                      className="bg-white border shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="w-70 bg-cyan-500 mb-2  "
        >
          Apply Discount Code
        </Button>
        <FormError message={error} />
        <FormSuccess message={success} />
        <hr />
      </form>
    </Form>
  );
};
