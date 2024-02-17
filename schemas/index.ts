import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});

export const PropertySchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  meta: z.string().min(1, {
    message: "Meta description is required",
  }),
  hours: z.object({
    mens: z.object({
      weekend: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
      weekday: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
    }),

    womens: z.object({
      weekend: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
      weekday: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
    }),
  }),
  location: z.string().min(1, {
    message: "location is required",
  }),
  address: z.string().min(1, {
    message: "address is required",
  }),
  reviews: z.array(
    z.object({
      date: z.string(),
      rating: z.number(),
      title: z.string(),
      description: z.string(),
      userName: z.string(),
    })
  ),
  availability: z.array(
    z.object({
      date: z.string(),
      price: z.string(),
      free: z.number(),
    })
  ),
  imgUrls: z.array(z.string()),
  price: z.number(),
  free: z.number(),
  type: z.string(),
  depth: z.number(),
  tags: z.array(z.string()),
});

export const CreatePropertyFormProps = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  meta: z.string().min(1, {
    message: "Meta description is required",
  }),
  mwdcheckIn: z.string().min(5, {
    message: "checkIn is required",
  }),
  mwdcheckOut: z.string().min(5, {
    message: "checkOut is required",
  }),
  mwecheckIn: z.string().min(5, {
    message: "checkIn is required",
  }),
  mwecheckOut: z.string().min(5, {
    message: "checkOut is required",
  }),
  wwdcheckIn: z.string().min(5, {
    message: "checkIn is required",
  }),
  wwdcheckOut: z.string().min(5, {
    message: "checkOut is required",
  }),
  wwecheckIn: z.string().min(5, {
    message: "checkIn is required",
  }),
  wwecheckOut: z.string().min(5, {
    message: "checkOut is required",
  }),
  location: z.string().min(1, {
    message: "location is required",
  }),
  address: z.string().min(1, {
    message: "address is required",
  }),
  imgUrls: z.array(z.string()),
  price: z.number(),
  free: z.number(),
  type: z.string(),
  tags: z.array(z.string()).optional(),
  depth: z.number(),
});

export const CreatePropertyProps = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  meta: z.string().min(1, {
    message: "Meta description is required",
  }),
  hours: z.object({
    mens: z.object({
      weekend: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
      weekday: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
    }),

    womens: z.object({
      weekend: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
      weekday: z.object({
        checkIn: z.string().min(5, {
          message: "checkIn is required",
        }),
        checkOut: z.string().min(5, {
          message: "checkOut is required",
        }),
      }),
    }),
  }),

  location: z.string().min(1, {
    message: "location is required",
  }),
  address: z.string().min(1, {
    message: "address is required",
  }),
  imgUrls: z.array(z.string()),
  price: z.number(),
  free: z.number(),
  type: z.string(),
  tags: z.array(z.string()).optional(),
  depth: z.number(),
});
export const BookingSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  userId: z.string(),
  date: z.string(),
  price: z.number().int(),
  bookingTime: z.date(),
  discountCode: z.optional(z.string()),
});

export const ReviewSchema = z.object({
  bookingId: z.string(),
  propertyId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  description: z.string(),
});

export const DiscountSchema = z.object({
  code: z.string(),
});
