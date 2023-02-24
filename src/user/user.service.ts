import { Injectable } from '@nestjs/common';
import { UserMetadata } from 'src/auth/user-metadata.interface';

@Injectable()
export class UserService {
  getUser(user: UserMetadata): { username: string; email: string } {
    return { username: user.username, email: user.email };
  }
}
