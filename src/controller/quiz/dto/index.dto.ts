import { Level } from '@root/src/shared/enum/quiz.enum';
import { MinLength, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateDTO { 
  @IsNotEmpty()
  public title = new Title();

  @IsNotEmpty()
  public question:Question[]
}

export class Title {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title_name: string;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  user_id: number;
}

export class Question {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  question_name: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  title_id: number;

  @IsNotEmpty()
  response:Response[];
}

export class Response {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  response_name: string;

  @IsNotEmpty()
  correct: boolean;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  question_id: number;
}
  