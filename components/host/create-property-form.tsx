"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePropertyFormProps } from "@/schemas";
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
import { TypePicker } from "@/components/host/type-picker";
import { EnviromentPicker } from "@/components/host/env-picker";

export const CreatePropertyForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePropertyFormProps>>({
    resolver: zodResolver(CreatePropertyFormProps),
    defaultValues: {
      title: "",
      description: "",
      checkIn: "08:00",
      checkOut: "23:00",
      location: "",
      type: "",
      imgUrls: [],
      price: 0,
      free: 0,
      depth: 0,
      heigth: 0,
      width: 0,
      enviroment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePropertyFormProps>) => {
    setError("");
    setSuccess("");
    values = { ...values, imgUrls: images };
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
            window.location.reload();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper headerLabel="Create property">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[400px]"
        >
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
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Checkin Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="checkin time"
                        type="time"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CheckOut Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="checkout time"
                        type="time"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Turkish Liras)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="500 Tl"
                        type="number"
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="free"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Guest Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="4 people"
                        type="number"
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Google Maps Link)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="https://www.google.com/maps/..."
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depth (meters)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="4 (meters)"
                        type="number"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heigth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heigth (meters)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="25 (meters)"
                        type="number"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (meters)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="6 (meters)"
                        type="number"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <TypePicker setType={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enviroment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enviroment</FormLabel>
                    <FormControl>
                      <EnviromentPicker setEnv={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imgUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image ({images.length}/5) </FormLabel>

                    <FormControl>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          console.log("Files: ", res);
                          const newImages = [...images, res[0].url];
                          setImages(newImages);

                          field.onChange(images);
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

          <Button disabled={isPending} type="submit" className="w-full">
            Create property
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
