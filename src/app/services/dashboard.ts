import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// DEPENDENCY-INJECTION: @Injectable makes this available for dependency injection
// providedIn: 'root' = singleton service (one instance across entire app)
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // ENCAPSULATION: private usersSubject - hidden internal implementation
  // Components cannot directly modify, only receive updates through observable
  // ABSTRACTION: BehaviorSubject abstracts reactive state management
  private usersSubject = new BehaviorSubject<any[]>([]);
  
  // ABSTRACTION: users$ provides public read-only access to data
  // asObservable() converts subject to observable for safe public exposure
  // Components can subscribe but cannot emit values - controlled interface
  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor() {
    // SINGLE-RESPONSIBILITY: loads initial data on service creation
    this.refreshUsers();
  }

  // SINGLE-RESPONSIBILITY: only refreshes user data, pure data management
  // ENCAPSULATION: private implementation detail of how/where data is fetched
  refreshUsers() {
    // ABSTRACTION: localStorage access abstracted in this method
    // If storage changes (API, database), only this method needs update
    const data = localStorage.getItem('registeredUsers');
    const users = data ? JSON.parse(data) : [];
    // ENCAPSULATION: emit data through subject only internally to this service
    this.usersSubject.next(users);
  }
}