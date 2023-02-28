import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class StudentDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'The ID of the student',
    default: 2,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'The name of the student',
    default: 'Rick Sanchez',
  })
  name: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'The password of the student',
    default: 'asdfgh',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: "Specifies the student membership's state",
    default: true,
  })
  active: boolean;

  @IsDate()
  @ApiProperty({
    description: "The expiration date of the student's membership",
    default: new Date(),
  })
  expiration_date: Date;

  @IsBoolean()
  @ApiProperty({
    description: "Reflects the student's attendance of the dat",
    default: true,
  })
  attendance_today: boolean;

  @IsDate()
  @ApiProperty({
    description: 'The last update date time',
    default: new Date(),
  })
  update_at: Date;

  @IsNumber()
  @ApiProperty({
    description:
      'The ID that enables de relationship with the Professor entity',
    default: 2,
  })
  professorId: number;
}
