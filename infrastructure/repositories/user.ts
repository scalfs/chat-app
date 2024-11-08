import { User } from "@/domain/entities";
import { IUserRepository } from "@/domain/repositories";
import { supabase } from "../libs/supabase";

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
