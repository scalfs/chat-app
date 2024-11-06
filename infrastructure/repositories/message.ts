import { ChatMessage } from "@/domain/entities";
import {
  CreateMessageParams,
  GetMessagesParams,
  IMessageRepository,
  MessageReactionParams,
} from "@/domain/repositories";
import { supabase } from "../libs/supabase";

export class SupabaseMessageRepository implements IMessageRepository {
  async getMessages(params: GetMessagesParams): Promise<ChatMessage[]> {
    const { offset, limit, chatId } = params;
    const { data, error } = await supabase
      .from("messages")
      .select(
        `id, chat_id, user_id, content, created_at, message_reactions (user_id, emoji_unicode, emoji_description, created_at)`
      )
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .range(offset, offset + limit);

    if (error) {
      console.error("Error fetching messages:", error);
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }

    return data.map((message) => ({
      id: message.id,
      chat_id: message.chat_id!,
      user_id: message.user_id!,
      content: message.content,
      created_at: message.created_at,
      reactions: message.message_reactions || [],
    }));
  }

  async createMessage(params: CreateMessageParams): Promise<ChatMessage> {
    const { chatId, userId, content } = params;

    const { data, error } = await supabase
      .from("messages")
      .insert([{ chat_id: chatId, user_id: userId, content }])
      .select()
      .single();

    if (error) {
      console.error("Error creating message:", error);
      throw new Error(`Failed to create message: ${error.message}`);
    }

    return {
      id: data.id,
      chat_id: data.chat_id!,
      user_id: data.user_id!,
      content: data.content,
      created_at: data.created_at,
      reactions: [],
    };
  }

  async addReaction(params: MessageReactionParams): Promise<void> {
    const { messageId, userId, emojiUnicode, emojiDescription } = params;

    const { error } = await supabase.from("message_reactions").insert([
      {
        message_id: messageId,
        user_id: userId,
        emoji_unicode: emojiUnicode,
        emoji_description: emojiDescription,
      },
    ]);

    if (error) {
      console.error("Error adding reaction:", error);
      throw new Error(`Failed to add reaction: ${error.message}`);
    }
  }

  async removeReaction(params: MessageReactionParams): Promise<void> {
    const { messageId, userId, emojiUnicode } = params;

    const { error } = await supabase.from("message_reactions").delete().match({
      message_id: messageId,
      user_id: userId,
      emoji_unicode: emojiUnicode,
    });

    if (error) {
      console.error("Error removing reaction:", error);
      throw new Error(`Failed to remove reaction: ${error.message}`);
    }
  }
}
