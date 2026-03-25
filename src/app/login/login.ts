import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isSignUpMode = false;
  loginForm!: FormGroup;
  message = '';

  users: any[] = [];

  constructor() {
  this.loginForm = this.fb.group({
    username: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(15)
    ]],
    password: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(10)
    ]],
    email: ['', [Validators.email]] // Email starts optional for Login
  });
}

signup() {
  if (!this.isSignUpMode) {
    this.isSignUpMode = true;
    this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
    this.loginForm.get('email')?.updateValueAndValidity();
  } else {
    if (this.loginForm.valid) {
      const newUser = this.loginForm.value;
      this.users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(this.users));
      alert('User Registered!');
      this.isSignUpMode = false;
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      this.message = 'Please fix the errors in the form.';
    }
  }
}
ngOnInit() {
    const savedUsers = localStorage.getItem('registeredUsers');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  /**
   * Handle Login logic (Admin check + LocalStorage check)
   */
  login() {
    if (this.isSignUpMode) {
      this.isSignUpMode = false;
      this.loginForm.get('email')?.clearValidators();
      this.loginForm.get('email')?.updateValueAndValidity();
      this.message = '';
      return;
    }

    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      this.router.navigate(['/dashboard']);
      return;
    }

    // 2. LocalStorage User Check
    const userExists = this.users.find(u => u.username === username && u.password === password);

    if (userExists) {
      alert(`Welcome back, ${username}!`);
      this.router.navigate(['/dashboard']);
    } else {
      this.message = 'Invalid username or password.';
    }
  }

  /**
   * Clear all registered users
   */
  clearTable() {
    if (confirm('Are you sure you want to delete all registered accounts?')) {
      localStorage.removeItem('registeredUsers');
      this.users = [];
      this.message = 'User list cleared.';
    }
  }
}