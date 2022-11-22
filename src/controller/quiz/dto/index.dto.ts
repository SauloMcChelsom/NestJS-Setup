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
  ArrayMaxSize,
  MinLength, 
  IsNumber, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  ValidatorConstraint, 
  ValidatorConstraintInterface, 
  Validate,
  registerDecorator, 
  ValidationOptions, 
  ValidationArguments
} from 'class-validator';
import { Transform, Type, Exclude } from "class-transformer";

function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  
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
class IsTitleArray implements ValidatorConstraintInterface {
  public async validate(authData: Title[], args: ValidationArguments) {
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
class IsTitle implements ValidatorConstraintInterface {
  public async validate(authData: Title, args: ValidationArguments) {
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
class CustomTextLength implements ValidatorConstraintInterface {
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
const transformAnswers = answers => {
  return answers.value
};

class Title {
  @Exclude()
  id?: number;

  @Exclude()
  user_id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(240)
  title_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  level: string;
}

class Response {
  @Exclude()
  id?: number;

  @Exclude()
  question_id?: number;

  @Exclude()
  timestamp?: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(600)
  response_name: string;

  @IsNotEmpty()
  @IsBoolean()
  correct: boolean;
}

class Question {
  @Exclude()
  id?: number;

  @Exclude()
  timestamp?: Date;

  @Exclude()
  title_id?: number;

  @IsString()
  @MinLength(4)
  @MaxLength(240)
  question_name: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => Response)
  response:Response[];
}

export class CreateDTO  { 
  @Exclude()
  id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Transform(transformAnswers, { toClassOnly: true })//exemplo
  @IsNonPrimitiveArray()//exemplo
  @ValidateNested({ each: true })
  @Type(() => Title)
  title:Title

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => Question)
  public question:Question[]
}
