import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { 
    
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl).pipe(
      catchError(() => throwError(() => new Error('An error ocurred while calling the external api')))
    );
  }
}
