import { Component, inject } from '@angular/core';
import { SharedService } from './../../shared.service';
import { NgIf } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dash-nav',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css',
})
export class DashNavComponent {
  user: any;
  profileModal: boolean = false;

  expand: boolean | undefined;
  modal: boolean | undefined;

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  constructor(private SharedService: SharedService) {
    this.SharedService.expand$.subscribe((expand) => (this.expand = expand));
    this.SharedService.modal$.subscribe((modal) => (this.modal = modal));
  }
  toggleModal() {
    this.SharedService.toggleModal();
  }
  toggleProfileModal() {
    this.profileModal = !this.profileModal;
  }
  logout() {
    this.auth.signOut().then(() => {
      console.log('User signed out');
      localStorage.removeItem('user');
      localStorage.removeItem('history');
    });
    window.location.href = '/';
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
