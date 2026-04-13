import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// Double check this path! 
import { DashboardService } from '../services/dashboard'; 
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

// OOP APPROACHES APPLIED TO THIS COMPONENT:
// 1. //encapsulation - private dashService hides internal implementation, controlled access
// 2. //inheritance - implements OnInit interface from Angular lifecycle
// 3. //polymorphism - ngOnInit() implements interface contract method
// 4. //abstraction - DashboardService abstracts database/storage layer from UI logic
// 5. //composition - Dashboard composes DashboardService for data management
// 6. //single-responsibility-principle - Dashboard handles UI logic, DashboardService handles data
// 7. //dependency-injection - inject(DashboardService) injects dependency at runtime

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  // ENCAPSULATION: private visibility hides dashService from external access
  private dashService = inject(DashboardService);

  searchControl = new FormControl('');
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  
  currentPage = 1;
  pageSize = 5;

  // INHERITANCE: ngOnInit() is from Angular's OnInit interface (lifecycle hook)
  // POLYMORPHISM: implements interface contract method signature
  // Called automatically by Angular after component initialization
  ngOnInit() {
    // COMPOSITION + ABSTRACTION: use dashService to get user data
    // dashService.users$ is an Observable - abstracts how data is fetched
    // DEPENDENCY-INJECTION: dashService was injected at component creation
    this.dashService.users$.subscribe((data: any[]) => {
      this.allUsers = data;
      this.filteredUsers = data;
      console.log("Service Data Received:", data);
    });

    this.searchControl.valueChanges.pipe(
      tap(val => console.log(`[Input]: ${val}`)),
      debounceTime(5000),  // ABSTRACTION: delays search, reduces server calls
      distinctUntilChanged(),  // ABSTRACTION: ignores repeated search terms
      tap(val => console.log(`%c[Request]: Searching for "${val}"`, 'color: #0a2e5c')),
      map(val => (val || '').toLowerCase())
    ).subscribe((term: string) => {
      // SINGLE-RESPONSIBILITY: filter logic handled here
      if (!term) {
        this.filteredUsers = [...this.allUsers];
      } else {
        // ABSTRACTION: filter provides simple interface for complex matching logic
        this.filteredUsers = this.allUsers.filter(u =>
          u.username.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
        );
      }
      // ENCAPSULATION: reset pagination when data changes
      this.currentPage = 1;
    });
  }

  // ENCAPSULATION: controlled setter method for changing page state
  setPage(page: number) {
    this.currentPage = page;
  }

  // ABSTRACTION: paginatedData getter abstracts pagination calculation
  // Template uses simple property without knowing implementation details
  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  // ABSTRACTION: totalPages getter abstracts pagination math
  // Encapsulates complex calculation behind simple property
  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
  gotoPortfolio() {
    // Navigate to the portfolio page
    window.location.href = '/portfolio';
  }
  logout() {
    window.location.href = '/login';
  }
}