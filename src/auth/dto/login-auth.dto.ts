import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: "The professor's name",
    default: 'Max',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The professor's password",
    default: 'javascript',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
