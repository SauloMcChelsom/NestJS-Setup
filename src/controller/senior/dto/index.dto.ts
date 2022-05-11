import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CheckInSeniorDto  {
  @IsNotEmpty() 
  @IsNumber()
  senior_id: number;
  
  @IsNotEmpty()
  @IsBoolean()
  add_car: boolean; 

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  dateIn: Date;

  @IsNotEmpty()
  dateOut: Date;
}

export class CreateSeniorDto  {
  @IsNotEmpty() 
  @IsString()
  @MinLength(11)
  documents: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  phone: string;
}

