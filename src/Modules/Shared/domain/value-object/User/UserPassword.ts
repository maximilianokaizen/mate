import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';
export class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsStrong(value);
  }

  private ensureIsStrong(password: string): void {
    if (password.length < 8) {
      throw new ValueObjectException('Password must be at least 8 characters long');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) {
      throw new ValueObjectException('Password must contain at least one uppercase letter');
    }

    if (!hasLowerCase) {
      throw new ValueObjectException('Password must contain at least one lowercase letter');
    }

    if (!hasNumbers) {
      throw new ValueObjectException('Password must contain at least one number');
    }

    if (!hasSpecialChar) {
      throw new ValueObjectException('Password must contain at least one special character');
    }
  }
}
