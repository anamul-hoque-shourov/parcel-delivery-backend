import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { UserEntity, SafeUserEntity } from '@/modules/user/domain/user.entity';
import { IUserModel } from './models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUserModel>,
  ) {}

  private toDomain(doc: any): SafeUserEntity | null {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    const { _id, username, email, createdAt, updatedAt } = obj;
    return {
      id: _id ? _id.toString() : undefined,
      username,
      email,
      createdAt,
      updatedAt,
    };
  }

  private toDomainWithPassword(doc: any): UserEntity | null {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    const { _id, username, email, password, createdAt, updatedAt } = obj;
    return {
      id: _id ? _id.toString() : undefined,
      username,
      email,
      password,
      createdAt,
      updatedAt,
    };
  }

  async create(user: UserEntity): Promise<SafeUserEntity> {
    const createdDoc = await this.userModel.create(user);
    return this.toDomain(createdDoc as IUserModel) as SafeUserEntity;
  }

  async findById(id: string): Promise<SafeUserEntity | null> {
    const doc = await this.userModel.findById(id).lean();
    return this.toDomain(doc);
  }

  async findByEmail(email: string): Promise<SafeUserEntity | null> {
    const doc = await this.userModel.findOne({ email }).lean();
    return this.toDomain(doc);
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email }).lean();
    return this.toDomainWithPassword(doc);
  }

  async findAll(): Promise<SafeUserEntity[]> {
    const docs = await this.userModel.find().lean();
    return (docs as any[]).map((doc) => this.toDomain(doc)) as SafeUserEntity[];
  }

  async update(id: string, updates: Partial<UserEntity>): Promise<SafeUserEntity | null> {
    const updatedDoc = await this.userModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    return this.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id);
    return !!result;
  }
}
