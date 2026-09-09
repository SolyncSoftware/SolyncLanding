import { z } from 'zod';

const optionalUrl = z.preprocess(
    (value) => {
        if (typeof value !== 'string') return undefined;
        const trimmed = value.trim();
        return trimmed || undefined;
    },
    z.url({ message: 'Portfolio / Website must be a valid URL.' }).max(1024).optional()
);

const optionalResume = z.preprocess(
    (value) => (value === null || value === '' ? undefined : value),
    z
        .file({ message: 'Resume must be a PDF, DOC, or DOCX file.' })
        .max(10_000_000, 'Resume must be smaller than 10MB.')
        .mime(
            ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            'Resume must be a PDF, DOC, or DOCX file.'
        )
        .optional()
);

const applySchema = z
    .object({
        name: z.string().trim().min(1).max(100),
        email: z.email().trim().min(1).max(255),
        reason: z.enum(['social-media', 'partners', 'referral', 'word-of-mouth', 'other']),
        message: optionalUrl, // portfolio
        worked_on: z.string().trim().min(100).max(1024),
        doing_now: z.string().trim().min(100).max(1024),
        skills: z.string().trim().min(100).max(1024),
        why_solync: z.string().trim().min(150).max(1024),
        resume: optionalResume
    })
    .refine((data) => Boolean(data.message) || Boolean(data.resume), {
        message: 'Please provide either a portfolio / website URL or attach your resume.',
        path: ['message']
    });

export default applySchema;
