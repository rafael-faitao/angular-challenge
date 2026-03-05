import { Route } from '@angular/router';
import { UsersList } from '../../users-list/users-list';

export const appRoutes: Route[] = [
  { path: '', component: UsersList },
];
