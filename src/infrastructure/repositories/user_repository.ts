import { IUserRepository } from "@/domain/repositories/i_user_repository";
import { User } from "@/domain/entities/user_entity";
import { UserModel, IUserModel } from "@/infrastructure/models/user_model";

type SafeUser = Omit<User, "password">;

export class UserRepository implements IUserRepository {
  private toSafeDomain(doc: IUserModel): SafeUser {
    const { _id, username, email } = doc.toObject ? doc.toObject() : doc;
    return { id: _id.toString(), username, email };
  }

  private toFullDomain(doc: IUserModel): User {
    const { _id, username, email, password } = doc.toObject
      ? doc.toObject()
      : doc;
    return { id: _id.toString(), username, email, password };
  }

  async findById(id: string): Promise<SafeUser | null> {
    const userDoc = await UserModel.findById(id).lean();
    return userDoc ? this.toSafeDomain(userDoc as unknown as IUserModel) : null;
  }

  async findAll(): Promise<SafeUser[]> {
    const userDocs = await UserModel.find().lean();
    return userDocs.map((doc) =>
      this.toSafeDomain(doc as unknown as IUserModel)
    );
  }

  async create(user: User): Promise<SafeUser> {
    const createdDoc = await UserModel.create(user);
    return this.toSafeDomain(createdDoc);
  }

  async update(id: string, user: Partial<User>): Promise<SafeUser | null> {
    const updatedDoc = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    }).lean();
    return updatedDoc
      ? this.toSafeDomain(updatedDoc as unknown as IUserModel)
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).select("+password");
    return userDoc ? this.toFullDomain(userDoc) : null;
  }
}
