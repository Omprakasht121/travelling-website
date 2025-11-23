import React from "react";
import {z} from "zod";
export const contactSchema = z.object({
    name: z.string().min(2,'Atleast 2 characters').max(25,'At most 25 characters'),
    email: z.string().email(),
    message: z.string().min(10,'At least 10 characters').max(500,'At most 500 characters'),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10–15 digits").optional(),
    address: z.string().optional()
});
