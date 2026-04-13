import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login'; 
import { Portfolio } from './portfolio/portfolio';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'portfolio', component: Portfolio },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  { path: '**', redirectTo: 'login' } 
];