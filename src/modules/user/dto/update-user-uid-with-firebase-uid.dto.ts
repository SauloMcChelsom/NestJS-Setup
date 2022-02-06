import { MinLength, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserUidWithFirebaseUidDto {
  @ApiProperty({
    example: 'uid',
    description: '455d4s5Dfe54eEf84fr',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userUid: string;

  @ApiProperty({
    example: 'uid',
    description: '455d4s5Dfe54eEf84fr',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firebaseUid: string;
}
