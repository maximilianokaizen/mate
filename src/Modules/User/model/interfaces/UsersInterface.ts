import { UserInterface } from './UserInterface';
export interface UsersInterface {
  success: boolean;
  message?: string;
  users?: UserInterface[];
  data?: any;
}
