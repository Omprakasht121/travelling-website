import {z} from "zod";

export const registerSchema = z.object({

    name: z.string().min(3, "Name should be at least 3 characters").max(25, "Name should be less than 25 characters").trim(),
    email:z.string().trim().email("invalid email address"),
    password: z.string().min(6,"password should at least 6 characters").max(20,"password should be less than 20 characters")
});