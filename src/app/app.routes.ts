import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  // Remove the leading slash from 'login'
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Optional: Add a wildcard to catch 404s
  { path: '**', redirectTo: 'login' } 
];