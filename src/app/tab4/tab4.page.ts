import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private auth: Auth,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  /* addPhotoToGallery () {
    this.photoService.addNewToGallery();
  } */

  /* public alertButtons = [
    {
      text: 'Rediger',
      role: 'rediger',
      handler: () => {
        console.log('Skal redigere');
        this.editProfileComponent.isOpen = true;
      },
    },
    {
      text: 'Slet',
      role: 'slet',
      handler: () => {
        console.log('slet profil');
      },
    },
  ]; */

  signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login'])
    })
  }
}
