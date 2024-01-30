import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class Active extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.ensureIsBoolean(value);
  }

  private ensureIsBoolean(value: any): void {
    if (typeof value !== 'boolean') {
      throw new ValueObjectException('Active must be a boolean');
    }
  }
}
