import { ValueObject } from './ValueObject';

export class CreatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }
}
