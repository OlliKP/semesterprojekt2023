import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    public photoService: PhotoService, 
  ) { }

  ngOnInit() {
  }

  addPhotoToGallery () {
    this.photoService.addNewToGallery();
  }
}
  /* public alertButtons = [
    {
      text: 'Rediger',
      role: 'rediger',
      handler: () => {
        console.log('Skal redigere');
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