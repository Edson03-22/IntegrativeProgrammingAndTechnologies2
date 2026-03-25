import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IntegrativeProgramming');
  username = '';
  password = '';
  message = '';

  validatePassword(pass: string): boolean {
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;

    return upper.test(pass) && lower.test(pass) && number.test(pass);
  }

  login() {
    if (this.username.trim() === '') {
      this.message = 'Please enter your username.';
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.message = 'Password must contain uppercase, lowercase, and number!';
      return;
    }

    this.message = `Welcome to Barangay Information & Services System, ${this.username}!`;
  }
}
