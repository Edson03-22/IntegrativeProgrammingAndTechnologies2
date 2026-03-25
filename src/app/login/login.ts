import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './login.html', // Change this to match your filename
  styleUrl: './login.css'       // Ensure this matches your CSS filename too
})
export class Login {
  protected readonly title = signal('IntegrativeProgramming');
  
  // Changed name to 'router' to match your login function
  private router = inject(Router);
  
  username = '';
  password = '';
  message = ''; // Added this to fix the HTML error
  isLoggedin = false;

  validatePassword(pass: string): boolean {
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    return upper.test(pass) && lower.test(pass) && number.test(pass);
  }

  login() {
  if (this.username === 'admin' && this.password === 'admin123') {
    this.message = 'Login successful! Redirecting...';
    
    // The string here must match the 'path' in app.routes.ts exactly
    this.router.navigate(['/dashboard']); 
  } else {
    this.message = 'Invalid username or password.';
  }
}
}