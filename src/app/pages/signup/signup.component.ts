import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  name: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async register(event: Event) {
    event.preventDefault();
    await createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (userCredential) => {
        console.log('User created : ', userCredential.user.uid);
        const user = {
          uid: userCredential.user.uid,
          email: this.email,
          name: this.name,
          profileImg: '',
          chats: [],
        };
        await setDoc(doc(this.firestore, 'users', user.uid), user)
          .then(() => {
            console.log('User added to firestore');
            this.router.navigate(['/home']);
          })
          .catch((error) =>
            console.error('Error adding user to firestore: ', error)
          );
      })
      .catch((error) => console.error('Error creating user: ', error));
  }
}
