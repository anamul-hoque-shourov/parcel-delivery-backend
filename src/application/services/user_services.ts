import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/domain/entities/user_entity";
import { IUserRepository } from "@/domain/repositories/i_user_repository";
import { UserRepository } from "@/infrastructure/repositories/user_repository";

const JWT_SECRET = process.env.JWT_SECRET || "your_strong_secret_key";
const JWT_EXPIRATION = "1h";

type SafeUser = Omit<User, "password">;

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string): Promise<SafeUser | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: User): Promise<SafeUser> {
    const { email, username, password } = userData;

    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToCreate: User = { username, email, password: hashedPassword };

    return this.userRepository.create(userToCreate);
  }

  async loginUser(
    email: string,
    passwordAttempt: string
  ): Promise<{ user: SafeUser; token: string }> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(passwordAttempt, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    const { password, ...safeUser } = user;
    return {
      user: safeUser as SafeUser,
      token,
    };
  }
}
