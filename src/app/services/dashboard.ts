import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Define the type here as any[] or a specific Interface
  private usersSubject = new BehaviorSubject<any[]>([]); 
  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor() {
    this.refreshUsers();
  }

  refreshUsers() {
    const data = localStorage.getItem('registeredUsers');
    const users = data ? JSON.parse(data) : [];
    this.usersSubject.next(users);
  }
}