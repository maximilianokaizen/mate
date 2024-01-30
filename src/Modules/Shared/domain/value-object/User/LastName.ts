import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class LastName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsNotEmpty(value);
  }

  private ensureIsNotEmpty(name: string): void {
    if (name.trim().length === 0) {
      throw new ValueObjectException('Lastname cannot be empty');
    }
    if (name.trim().length < 3) {
      throw new ValueObjectException('Lastname must have more of 3 characteres');
    }
  }
}
