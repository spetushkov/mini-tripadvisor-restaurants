import { Expose } from 'class-transformer';
import { Match } from '../../../class/Match';
import { SignInFormEntity } from '../signIn/SignInFormEntity';

export class SignUpFormEntity extends SignInFormEntity {
  @Expose()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword = '';
}
