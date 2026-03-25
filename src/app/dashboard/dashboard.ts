import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// Double check this path! 
import { DashboardService } from '../services/dashboard'; 
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private dashService = inject(DashboardService);

  searchControl = new FormControl('');
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  
  currentPage = 1;
  pageSize = 5;

  ngOnInit() {
    // Adding ': any[]' to data fixes the "Implicit any" error
    this.dashService.users$.subscribe((data: any[]) => {
      this.allUsers = data;
      this.filteredUsers = data;
      console.log("Service Data Received:", data);
    });

    this.searchControl.valueChanges.pipe(
      tap(val => console.log(`[Input]: ${val}`)),
      debounceTime(5000),
      distinctUntilChanged(),
      tap(val => console.log(`%c[Request]: Searching for "${val}"`, 'color: #0a2e5c')),
      map(val => (val || '').toLowerCase())
    ).subscribe((term: string) => {
      if (!term) {
        this.filteredUsers = [...this.allUsers];
      } else {
        this.filteredUsers = this.allUsers.filter(u =>
          u.username.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
        );
      }
      this.currentPage = 1;
    });
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
}