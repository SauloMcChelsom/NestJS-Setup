import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CheckInSeniorDto  {
  @IsNotEmpty() 
  @IsNumber()
  senior_id: number;
  
  @IsNotEmpty()
  @IsBoolean()
  adicional_veiculo: boolean;

  @IsNotEmpty()
  @IsString()
  valor: string;

  @IsNotEmpty()
  dataEntrada: Date;

  @IsNotEmpty()
  dataSaida: Date;
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

export class UpdateSeniorDto  {
  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(1)
  comment: string;
}


