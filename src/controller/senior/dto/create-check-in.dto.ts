import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCkeckInDto  {
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