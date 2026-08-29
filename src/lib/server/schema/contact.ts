import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.email().trim().min(1).max(255),
    reason: z.enum(['support', 'question', 'partners', 'trust-and-safety', 'other']),
    message: z.string().trim().min(1).max(1024)
});

export default contactSchema;
