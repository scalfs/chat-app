import { Chat } from "@/domain/entities";
import { IChatRepository } from "@/domain/repositories";
import { supabase } from "../libs/supabase";

export class SupabaseChatRepository implements IChatRepository {
  async createChat(): Promise<Chat> {
    const { data, error } = await supabase
      .from("chats")
      .insert({})
      .select()
      .single();

    if (error || !data) {
      console.error(error); // TODO: add a logger service, like sentry
      throw new Error("Failed to create chat.");
    }
    return data;
  }

  async addParticipants(chatId: number, userIds: number[]): Promise<void> {
    const participants = userIds.map((userId) => ({
      chat_id: chatId,
      user_id: userId,
    }));

    const { error } = await supabase
      .from("chat_participants")
      .insert(participants);

    if (error) throw new Error("Failed to add participants.");
  }
}
