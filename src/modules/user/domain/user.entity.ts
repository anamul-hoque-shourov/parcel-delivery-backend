export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SafeUserEntity = Omit<UserEntity, 'password'>;
