export class Page {
  private readonly value: number;

  constructor(value: number = 1) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('Page must be a positive number.');
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
