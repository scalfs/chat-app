import { User } from "../entities/types";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string): Promise<User>;
}
