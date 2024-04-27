import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

function isauth() {
  if (localStorage.getItem('user')) {
    return true;
  } else {
    window.location.href = '/';
  }
  return false;
}
function auth() {
  if (localStorage.getItem('user')) {
    window.location.href = '/home';
    return false;
  }
  return true;
}
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [auth] },
  { path: 'signup', component: SignupComponent, canActivate: [auth] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [isauth] },
  { path: '**', component: LandingComponent },
];
