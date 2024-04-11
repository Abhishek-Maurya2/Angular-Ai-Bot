import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAuth: boolean = false;
  private auth: Auth = inject(Auth);
  async logout() {
    await this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isAuth = false;
    });
  }
  async ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) this.isAuth = true;
      else this.isAuth = false;
      console.log(this.isAuth);
    });
  }
}
