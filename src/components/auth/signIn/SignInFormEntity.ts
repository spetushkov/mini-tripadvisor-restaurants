import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { FormItemMessage } from '../../utility/form/FormItemMessage';
import { AuthUser } from '../AuthUser';

export class SignInFormEntity implements AuthUser {
  @Expose()
  @IsString({ message: FormItemMessage.isString() })
  @IsNotEmpty({ message: FormItemMessage.isNotEmpty() })
  @IsEmail({}, { message: FormItemMessage.isEmail() })
  email = '';

  @Expose()
  @IsString({ message: FormItemMessage.isString() })
  @IsNotEmpty({ message: FormItemMessage.isNotEmpty() })
  @MinLength(6, { message: FormItemMessage.passwordMinLength('$constraint1') })
  password = '';
}
