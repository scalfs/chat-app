import { Chat, ChatDetails } from "@/domain/entities";
import { IChatRepository } from "@/domain/repositories";
import { formatDistanceToNow } from "date-fns";
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

  async getChatRooms(userId: number): Promise<ChatDetails[]> {
    const { data: chatRooms, error } = await supabase
      .from("chat_details")
      .select(
        `
        chat_id,
        created_at,
        display_name,
        last_message
      `
      )
      .eq("viewer_id", userId)
      .order("created_at", { ascending: false });

    if (error || !chatRooms) {
      console.error("Error fetching chat rooms:", error);
      throw new Error("Failed to fetch chat rooms");
    }

    return chatRooms.map((room) => ({
      id: room.chat_id!,
      name: room.display_name!,
      last_message: room.last_message!,
      timestamp: formatDistanceToNow(new Date(room.created_at!), {
        addSuffix: true,
      }),
    }));
  }
}
