import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async login(event: Event) {
    event.preventDefault();
    await signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCred) => {
        console.log('User signed in:', userCred.user.uid);
        getDoc(doc(this.firestore, 'users', userCred.user.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log('Document data:', docSnap.data());
              localStorage.setItem('user', JSON.stringify(docSnap.data()));
              this.router.navigate(['/dashboard']);
            }
          })
          .catch((error) => {
            console.error('Error getting document:', error);
          });
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  }
}
