import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserMetadata } from './user-metadata.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(authUserDto: AuthUserDto): Promise<{ token: string }> {
    const { user_id } = authUserDto;
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/users/${user_id}`,
      });
      const payload: UserMetadata = {
        id: data.id,
        username: data.username,
        email: data.email,
      };
      const token: string = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
  }
}
