import { Chat, User } from "@/domain/entities";
import { IChatRepository, IUserRepository } from "@/domain/repositories";
import { supabase } from "./client";

export class SupabaseUserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .eq("username", username)
      .single();

    if (error || !data) return null;
    return data;
  }

  async createUser(username: string): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert({ username })
      .select()
      .single();

    if (error || !data) throw new Error("Failed to create user.");
    return data;
  }
}

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
