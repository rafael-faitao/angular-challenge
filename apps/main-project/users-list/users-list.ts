import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
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

  filterDictionary = signal<Record<string, string>>({});

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe((term: string | null) => {
      this.filterDictionary.set({ ...this.filterDictionary(), username: (term ?? '').toLowerCase().trim() });
    });

    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getAll().pipe(
      take(1),
    ).subscribe({
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
    const filters = this.filterDictionary();
    const hasFilters = Object.values(filters).some(v => !!v);
    if (!hasFilters) return this.users();

    return this.users().filter(user =>
      Object.entries(filters).every(([property, filterValue]) => {
        if (!filterValue) return true;
        return (user as Record<string, any>)[property]?.toLowerCase().includes(filterValue);
      })
    );
  }

}
