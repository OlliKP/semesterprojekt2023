import { Component, OnInit } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  Auth,
  updateProfile,
} from '@angular/fire/auth';
import { Router, RouterConfigOptions } from '@angular/router';



@Component({
  selector: 'app-opret',
  templateUrl: './opret.page.html',
  styleUrls: ['./opret.page.scss'],
})
export class OpretPage implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
  };

  isLoading = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {}

  signUp() {
    this.isLoading = true;
    createUserWithEmailAndPassword(
      this.auth,
      this.user.email,
      this.user.password
    ).then((response) => {
      console.log(this.auth.currentUser);
      updateProfile(this.auth.currentUser, {
        displayName: this.user.name,
      }).then((updateResponse) => {
        setTimeout(() => {
          this.router.navigate(['/introduction'])
        }, 1000);
      });
    })
    .catch((err) => {
      alert('Der skete en fejl! Prøv igen')
      this.isLoading = false;
    });
  }

  
}
