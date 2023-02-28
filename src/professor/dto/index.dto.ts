import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class ProfessorDTO {
  @ApiProperty({
    description: "The professor's ID",
    default: 15,
  })
  id: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({
    description: "The professor's name",
    default: 'Elon',
  })
  name: string;

  @IsNotEmpty()
  @Length(5, 14)
  @ApiProperty({
    description: "The professor's password",
    default: 'nestjs<3',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: "Specifies the professor membership's state",
    default: true,
  })
  active: boolean;

  @IsDate()
  @ApiProperty({
    description: "The expiration date of the professor's membership",
    default: new Date(),
  })
  expiration_date: Date;
}
