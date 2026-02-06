import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@/modules/user/domain/user.repository.interface';
import { UserEntity, SafeUserEntity } from '@/modules/user/domain/user.entity';
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<SafeUserEntity> {
    const { email, username, password } = createUserDto;

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters.');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToCreate: UserEntity = {
      username,
      email,
      password: hashedPassword,
    };

    return this.userRepository.create(userToCreate);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ user: SafeUserEntity; token: string }> {
    const { email, password: passwordAttempt } = loginUserDto;

    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordAttempt, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    const { password, ...safeUser } = user;
    return {
      user: safeUser as SafeUserEntity,
      token,
    };
  }

  async getUserById(id: string): Promise<SafeUserEntity | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<SafeUserEntity[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, updates: Partial<UserEntity>): Promise<SafeUserEntity | null> {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    return this.userRepository.update(id, updates);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
