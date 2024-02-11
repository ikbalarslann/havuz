import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/auth",
          "/auth/error",
          "/auth/login",
          "/auth/new-password",
          "/auth/new-verification",
          "/auth/register",
          "/auth/reset",
          "/host",
          "/host/analytics",
          "/host/availability",
          "/host/bookings",
          "/host/reviews",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
