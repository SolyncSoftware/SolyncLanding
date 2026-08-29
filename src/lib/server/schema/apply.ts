import { z } from "zod";

const applySchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.email().trim().min(1).max(255),
    reason: z.enum(["social-media", "partners", "referral", "word-of-mouth", "other"]),
    message: z.url().trim().min(1).max(1024),
    resume: z.file().max(10_000_000).mime(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])
});

export default applySchema;
