import { User } from "@/domain/entities/user_entity";

export type SafeUser = Omit<User, "password">;

export interface IUserRepository {
  findById(id: string): Promise<SafeUser | null>;
  findAll(): Promise<SafeUser[]>;
  create(user: User): Promise<SafeUser>;
  update(id: string, user: Partial<User>): Promise<SafeUser | null>;
  delete(id: string): Promise<boolean>;
  findByEmailWithPassword(email: string): Promise<User | null>;
}
