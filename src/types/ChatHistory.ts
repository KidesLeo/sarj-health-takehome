import { z } from "zod";

export const ChatHistoryMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  message: z.string(),
});

export const ChatHistorySchema = z.array(ChatHistoryMessageSchema);

export type ChatHistoryMessage = z.infer<typeof ChatHistoryMessageSchema>;
export type ChatHistory = z.infer<typeof ChatHistorySchema>;
