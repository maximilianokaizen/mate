export interface UserInterface {
  readonly id?: number | null;
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  user: string;
  password: string;
  active: boolean;
  createdAt: Date | string;
  deletedAt?: Date | string;
  modifiedAt?: Date | string;
}
