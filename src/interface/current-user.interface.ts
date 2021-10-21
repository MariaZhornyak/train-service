import { Roles } from '../enum/roles.enum';

export interface ICurrentUser {
  id: string;
  name: string;
  surname: string;
  role: Roles;
}
