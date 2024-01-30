import { UserInterface } from './UserInterface';
export interface OneUserInterface {
  success: boolean;
  message?: string;
  user?: UserInterface;
  data?: any;
}
