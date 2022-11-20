import { Level } from '@root/src/shared/enum/quiz.enum';
import { MinLength, IsNumber, IsNotEmpty, IsOptional, IsBoolean, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';
import {
  MaxLength,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import { Transform, Type } from "class-transformer";


import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('--->', value)
          return true//Array.isArray(value) && value.reduce((a, b) => a && typeof b === 'object' && !Array.isArray(b), true);
        },
        defaultMessage(): string {
          return 'shop with this uid does not exist';
        }
      },
    });
  };
}

@ValidatorConstraint()
export class IsTitleArray implements ValidatorConstraintInterface {
  public async validate(authData: Title2[], args: ValidationArguments) {
      return Array.isArray(authData) && authData.reduce((a, b) => a && (typeof b.level === "string") && typeof b.title_name === "string", true);
  }
}
/*
@Validate(IsTitle, {
  message: "Enter valid value .",
})
title:IsTitleArray
*/

@ValidatorConstraint()
export class IsTitle implements ValidatorConstraintInterface {
  public async validate(authData: Title2, args: ValidationArguments) {
      return ((typeof authData.level === "string") && (typeof authData.title_name === "string"))
  }
}
/**
@Validate(IsTitle, {
  message: "Enter valid value .",
})
title:Title2
*/

@ValidatorConstraint()
export class CustomTextLength implements ValidatorConstraintInterface {
  public async validate(text: string, validationArguments: ValidationArguments) {
    const [min, max] = validationArguments.constraints
    return text.length >= min && text.length <= max
  }
}
/*
@Validate(CustomTextLength, [2, 5], {
  message: "min 2 max 5",
})
title_name: string;
*/

class Title {
  @IsNotEmpty()
  @IsNumber()
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  title_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  level: string;

  @IsNotEmpty()
  @IsNumber()
  user_id?: number;
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

export class Question {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  question_name: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  title_id: number;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @Type(() => Response)
  response:Response[];
}

export class CreateDTO  { 
  /**
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => Title)
   */
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({always: true, each: false, message:'title' })
  @IsNonPrimitiveArray()
  @Type(() => Title)
  title!:Title

  /*@ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => Question)*/
  @IsNotEmpty()
  public question:Question[]
}

export class Title2 {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  title_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  level: string;

}
const transformAnswers = answers => {
  console.log([answers.value], JSON.stringify(answers.value))
  return { level: 'EASY', title_name: 'Sobre Java' }
};
export class CreateFDTO  { 
  /**
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => Title)
  */
  //@Transform(transformAnswers, { toClassOnly: true })
  @IsNonPrimitiveArray()
  @ValidateNested({ each: false })
  @Type(() => Title2)
  readonly title:Title2
}
/*
 {
    "title":
			{
      	"level":"EASY",
      	"title_name":"Sobre Java"
    	}
		
 }
*/