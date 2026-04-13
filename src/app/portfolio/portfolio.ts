import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  goBack() {
    // Navigate back to the dashboard page
    window.location.href = '/dashboard';
  }
}
