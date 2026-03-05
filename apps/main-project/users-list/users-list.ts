import { Component, OnInit, signal } from '@angular/core';
import { User, UserService } from '../../../libs/user-lib/src';


@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
})
export class UsersList implements OnInit {

  constructor(private usersService: UserService) {}

  users = signal<User[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    this.usersService.getAll().subscribe({
      next: (users: User[]) => {
        this.users.set(users);
        //this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Error loading users');
        this.loading.set(false);
      }
    });
  }

}
