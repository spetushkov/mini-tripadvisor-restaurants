import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../../class/Match';
import { FormItemMessage } from '../../utility/form/FormItemMessage';
import { SignInFormEntity } from '../signIn/SignInFormEntity';

export class SignUpFormEntity extends SignInFormEntity {
  @Expose()
  @IsString({ message: FormItemMessage.isString() })
  @IsNotEmpty({ message: FormItemMessage.isNotEmpty() })
  @MinLength(6, { message: FormItemMessage.passwordMinLength('$constraint1') })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword = '';
}
