import { Component, OnInit } from '@angular/core';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
  };

  isLoading = false;

  constructor(private auth: Auth, private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {}

  login() {
    this.isLoading = true;
    signInWithEmailAndPassword(this.auth, this.user.email, this.user.password)
      .then((response) => {
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1000);
        console.log(response);
      })
      .catch((err) => {
        this.isLoading = false;
        alert('Der skete en fejl! - Prøv igen')
      });
  }


  signInGoogle() {
    this.firebaseService.googleSignIn();
  }
}
