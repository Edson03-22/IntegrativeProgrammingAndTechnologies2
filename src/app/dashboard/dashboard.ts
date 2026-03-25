import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  userName = 'Admin User';
  currentDate = new Date().toLocaleDateString();

  // Mock data for the dashboard
  stats = [
    { label: 'Total Complaints', count: 124, icon: '📋', color: '#e7b10a' },
    { label: 'Pending Cases', count: 12, icon: '⏳', color: '#ff4d4d' },
    { label: 'Resolved', count: 112, icon: '✅', color: '#2ecc71' },
    { label: 'Registered Residents', count: '2,450', icon: '👥', color: '#3498db' }
  ];
}