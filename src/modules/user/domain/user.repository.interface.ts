import { SafeUserEntity, UserEntity } from './user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<SafeUserEntity>;
  findById(id: string): Promise<SafeUserEntity | null>;
  findByEmail(email: string): Promise<SafeUserEntity | null>;
  findByEmailWithPassword(email: string): Promise<UserEntity | null>;
  findAll(): Promise<SafeUserEntity[]>;
  update(id: string, updates: Partial<UserEntity>): Promise<SafeUserEntity | null>;
  delete(id: string): Promise<boolean>;
}

export const IUserRepository = Symbol('IUserRepository');
