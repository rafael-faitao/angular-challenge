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

  ngOnInit(): void {
    this.usersService.getAll().subscribe((users: User[]) => {
      this.users.set(users);
      console.log(this.users());
    });
  }

}
