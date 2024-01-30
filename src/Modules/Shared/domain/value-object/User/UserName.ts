import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class UserName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsNotEmpty(value);
    this.ensureIsValidUsername(value);
  }

  private ensureIsNotEmpty(name: string): void {
    if (name.trim().length === 0) {
      throw new ValueObjectException('Username cannot be empty');
    }
    if (name.trim().length < 3) {
      throw new ValueObjectException('Username must have at least 3 characters');
    }
  }

  private ensureIsValidUsername(name: string): void {
    const usernameRegex = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
    if (!usernameRegex.test(name)) {
      throw new ValueObjectException('Username contains invalid characters');
    }
  }
}
