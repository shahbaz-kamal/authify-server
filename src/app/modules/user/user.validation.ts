import z from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name should be at least minimum of two characters")
    .max(50, "Name should be maximum of 50 characters"),
  email: z
    .email("Invalid Email Format")
    .min(2, "Email should be at least minimum of two characters")
    .max(50, "Email should be maximum of 50 characters")
    .optional(),
  password: z
    .string("Password Must be string")
    .min(6, "Password must includes at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .optional(),
  phone: z
    .string("Phone number must be a string")
    .regex(/^(\+8801[3-9][0-9]{8}|01[3-9][0-9]{8})$/, "Invalid Bangladeshi phone number format")
    .optional(),
  bio: z
    .string("Name is required")
    .min(2, "Name should be at least minimum of two characters")
    .max(50, "Name should be maximum of 50 characters")
    .optional(),
  profilePhoto: z.string("Photo must be string").optional(),
  locaation: z
    .string("Address must be string")
    .max(200, {
      message: "Address can not exceed more than 200 characters",
    })
    .optional(),
});
