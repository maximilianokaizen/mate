import { ValueObject } from './ValueObject';

export class DeletedAtValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }

  static markAsDeleted(): DeletedAtValueObject {
    return new DeletedAtValueObject(new Date());
  }
}
