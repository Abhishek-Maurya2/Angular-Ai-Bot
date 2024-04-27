import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

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
  profileImage: string = '';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, 'profileImages/' + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.profileImage = downloadURL;
          });
        }
      );
    }
  }
  async register(event: Event) {
    event.preventDefault();
    await createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (userCredential) => {
        console.log('User created : ', userCredential.user.uid);
        const user = {
          uid: userCredential.user.uid,
          email: this.email,
          name: this.name,
          profileImg: this.profileImage,
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
