import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from '@/modules/user/application/user.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '@/modules/user/application/dtos/user.dto';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { GetUser, AuthUser } from '@/common/decorators/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const success = await this.userService.deleteUser(id);
    return { success, message: success ? 'User deleted successfully' : 'User not found' };
  }
}
