import { MetadataRoute } from "next";
import { getAllProperties } from "@/data/property";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();
  const titleArray =
    properties &&
    properties.map((property) => property.title.split(" ").join("-"));

  const postEntries = titleArray
    ? titleArray?.map((title) => ({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/discover/${title}`,
      }))
    : [];

  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/error`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/login`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/new-password`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/new-verification`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/register`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}auth/reset`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}bookings`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}discover`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}pay`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}settings`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}shoppingCard`,
    },

    ...postEntries,
  ];
}
