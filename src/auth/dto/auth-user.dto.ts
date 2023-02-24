import { IsNumber, IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
