import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entitiy';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserDto, RegisterUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      // check if user already exists
      const isExist = await this.userRepository.findOne({
        where: { email: registerUserDto.email },
      });

      if (isExist) {
        throw new BadRequestException('User already exists');
      }

      // validate password
      const passwordValidation = this.passwordValidation(
        registerUserDto.password,
      );

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);

      registerUserDto.password = bcrypt.hashSync(
        registerUserDto.password,
        salt,
      );

      if (!passwordValidation.valid) {
        throw new BadRequestException(passwordValidation.message);
      }

      return await this.userRepository.save(registerUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private passwordValidation(password: string): {
    valid: boolean;
    message?: string;
  } {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;

    if (password.length < minLength) {
      return {
        valid: false,
        message: 'Password must be at least 8 characters long.',
      };
    }
    if (!hasNumber.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one number.',
      };
    }
    if (!hasLowercase.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one lowercase letter.',
      };
    }
    if (!hasUppercase.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one uppercase letter.',
      };
    }

    return { valid: true };
  }

  async getUser(getUserDto: GetUserDto): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: getUserDto.email },
    });
  }
}
