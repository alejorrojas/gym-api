import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class ProfessorDTO {
  @ApiProperty({
    description: 'The ID of the professor',
    default: 15,
  })
  id: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the professor',
    default: 'Elon Musk',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the professor',
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
