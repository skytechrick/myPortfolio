import z from 'zod';

export const apiResponseSchema = z.object({
    name: z.string().nonempty().min(3).max(255),
    mobileNumber: z.string().nonempty().min(10).max(10),
    email: z.string().email().email().transform(str => str.toLowerCase()),
    type: z.string().min(2).max(95).nonempty(),
    message: z.string().nonempty().max(1000),
});