import { z } from "zod";

const contactSchema = z.object({
    name: z.string().max(100),
    email: z.email().max(255),
    reason: z.enum(["support", "question", "partners", "trust-and-safety", "other"]),
    message: z.string().max(1024)
})

export default contactSchema;
