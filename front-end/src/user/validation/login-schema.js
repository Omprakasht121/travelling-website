import {z} from "zod";

export const loginSchema = z.object({
    email:z.string().trim().email("invalid email address"),
    password: z.string().min(6,"password should be at least 6 characters").max(20,"password should be less then 20 characters")
});