import { ChatMessage } from "@/domain/entities";
import { GetMessagesParams, IMessageRepository } from "@/domain/repositories";
import { supabase } from "../libs/supabase";

export class SupabaseMessageRepository implements IMessageRepository {
  async getMessages(params: GetMessagesParams): Promise<ChatMessage[]> {
    const { offset, limit, chatId } = params;
    const { data, error } = await supabase
      .from("messages")
      .select("id, chat_id, user_id, content, created_at")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .range(offset, offset + limit);

    if (error) throw new Error(`Failed to fetch messages: ${error.message}`);

    return data.map((message) => ({
      id: message.id,
      chat_id: message.chat_id!,
      user_id: message.user_id!,
      content: message.content,
      created_at: message.created_at,
    }));
  }
}
