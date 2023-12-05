import { Component, OnInit } from '@angular/core';
import { signOut, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user = {
    displayName: localStorage.getItem('displayName'),
    email: localStorage.getItem('email')
  }

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login'])
      localStorage.clear();
    })
  }
}
