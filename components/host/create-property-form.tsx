"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { PropertySchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createProperty } from "@/actions/create-property";
import { UploadButton } from "@/components/uploadthing";

export const CreatePropertyForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("/car.jpg");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      title: "",
      description: "",
      imgUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PropertySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProperty(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Create property"
      backButtonLabel="Edit property"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Hayat Hotel"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="A 5-star hotel in the heart of Istanbul."
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImageUrl(res[0].url);
                          console.log("Files: ", res);
                          field.onChange(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          console.log(`ERROR! ${error.message}`);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Image src={imageUrl} width={500} height={500} alt="image" />
          <Button disabled={isPending} type="submit" className="w-full">
            Create property
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
