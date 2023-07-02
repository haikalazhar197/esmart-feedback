import {z} from "zod";

export const feedbackSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    feedback: z.enum(["terrible", "okay", "awesome"]),
    comment: z.string().min(10).max(1000).optional(),
});

export const feedbacksSchema = z.array(feedbackSchema);

export type Feedback = z.infer<typeof feedbackSchema>;