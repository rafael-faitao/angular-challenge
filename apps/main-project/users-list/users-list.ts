import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { User, UserService } from '@challenge-workspace/user-lib';


@Component({
  selector: 'app-users-list',
  imports: [ReactiveFormsModule],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
})
export class UsersList implements OnInit, OnDestroy {

  constructor(private userService: UserService) {}

  users = signal<User[]>([]);
  filteredUsers = computed(() => this.applyFilters());
  loading = signal<boolean>(true);
  error = signal<string>('');

  filters = signal<Record<string, string>>({});

  searchControl = new FormControl('');
  private searchSub?: Subscription;

  ngOnInit(): void {
    this.searchSub = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((term: string | null) => {
      this.filters.set({ ...this.filters(), username: (term ?? '').toLowerCase().trim() });
    });

    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getAll().subscribe({
      next: (users: User[]) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.error.set(error?.message);
        this.loading.set(false);
      }
    });
  }

  applyFilters(): User[] {
    const filters = this.filters();
    const hasFilters = Object.values(filters).some(v => !!v);
    if (!hasFilters) return this.users();

    return this.users().filter(u =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (u as Record<string, any>)[key]?.toLowerCase().includes(value);
      })
    );
  }

}
