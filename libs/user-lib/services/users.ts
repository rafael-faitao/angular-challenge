import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { 
    
  }
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl)
  }
}
