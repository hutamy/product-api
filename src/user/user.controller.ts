import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserMetadata } from 'src/auth/user-metadata.interface';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController', true);
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: UserMetadata): { username: string; email: string } {
    this.logger.verbose(
      `Getting user ${user.username} metadata from bearer token`,
    );
    return this.userService.getUser(user);
  }
}
