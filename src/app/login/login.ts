import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);

  // 1. UI State Controls
  isLogin = true; 
  hasValidated = false;
  message = '';

  // 2. Login Fields
  email = '';
  password = '';

  // 3. Registration Fields
  regEmail = '';
  usernameReg = '';
  regPassword = '';


  // 4. The Array (This fixes your TS2339 Error)
  newuserList: any[] = [];

  // Toggle between Login and Register
  switchForm() {
    this.isLogin = !this.isLogin;
    this.message = '';
    this.hasValidated = false; // Reset table view when switching
  }

  // Logic for the "Sign In" button
  Validate() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
      this.message = 'Login successful! Redirecting...';
      this.router.navigate(['/dashboard']);
    } else {
      this.message = 'Invalid email or password.';
    }
  }

register() {
  // Check if all fields have values
  if (this.regEmail && this.usernameReg && this.regPassword) {
    
    // 1. Create the new user object
    const newUser = {
      email: this.regEmail,
      username: this.usernameReg
    };

    // 2. Add it to the array (the table will update automatically)
    this.newuserList.push(newUser);

    // 3. Set this to true so the *ngIf shows the table
    this.hasValidated = true;

    // 4. Success feedback
    this.message = 'Account added successfully!';

    // 5. Optional: Clear the input fields after adding
    this.regEmail = '';
    this.usernameReg = '';
    this.regPassword = '';

  } else {
    this.message = 'Please fill out all registration fields.';
  }
}
}