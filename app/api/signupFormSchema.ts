import { z } from "zod";


export const SignupFormSchema = z.object({
    username: z.string().toLowerCase().min(5, { message: 'userName must be at least 5 char' }).trim(),
    // email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8, { message: 'be at least 8 char' })
        .regex(/[a-zA-Z]/, { message: 'contain at least one char' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special charecter.' })
        .trim(),
})



export type FormState =
    | {
        error?: {
            username?: string[]
            // email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined