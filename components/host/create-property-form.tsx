"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useCallback, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createProperty } from "@/actions/create-property";
import { UploadButton } from "@/components/uploadthing";
import { TypePicker } from "@/components/host/type-picker";
import { TagPicker } from "@/components/host/tag-picker";
import Image from "next/image";

export const CreatePropertyForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [tags, setTags] = useState<string[]>([]);

  const setTagsOne = (tag: string) => {
    if (tags.includes(tag)) {
      const newTags = tags.filter((t) => t !== tag);
      setTags(newTags);
      return;
    }

    setTags([...tags, tag]);
  };

  const handleImageClick = (img: string) => {
    setImages(images.filter((image) => image !== img));
  };

  const form = useForm<z.infer<typeof CreatePropertyFormProps>>({
    resolver: zodResolver(CreatePropertyFormProps),
    defaultValues: {
      title: "",
      description: "",
      meta: "",
      checkIn: "08:00",
      checkOut: "23:00",
      location: "",
      address: "",
      type: "",
      imgUrls: [],
      price: 0,
      free: 0,
      depth: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePropertyFormProps>) => {
    const tagsWithoutEmpty = tags.filter((tag) => tag !== "");

    setError("");
    setSuccess("");
    values = { ...values, tags: tagsWithoutEmpty, imgUrls: images };
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
          className="space-y-6 w-[300px]"
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
                name="meta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="A 5-star hotel ..."
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="hocapasa mahallesi no:12 Istanbul/Turkey"
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender Separation Type</FormLabel>
                    <FormControl>
                      <TypePicker setType={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagPicker tags={tags} setType={setTagsOne} />
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
                          const newImages = [...images, res[0].url];
                          setImages(newImages);

                          field.onChange(images);
                        }}
                        onUploadError={(error: Error) => {
                          console.log(`ERROR! ${error.message}`);
                        }}
                        content={{
                          button: () => <div>Upload Image</div>,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                <div className="flex  space-x-1 max-w-[400px]">
                  {images.map((img, index) => (
                    <div key={index}>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div key={index} className="relative w-20 h-20">
                            <Image
                              src={img}
                              alt="property image"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Image</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this image?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleImageClick(img)}
                              className="bg-red-600 mt-2"
                            >
                              delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              }
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
