import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public alertButtons = [
    {
      text: 'Rediger',
      role: 'rediger',
      cssClass: 'alertRediger',
      handler: () => {
        console.log('Skal redigere');
      },
    },
    {
      text: 'Slet',
      role: 'slet',
      cssClass: 'alertSlet',
      handler: () => {
        console.log('slet profil');
      },
    },
  ];

}


