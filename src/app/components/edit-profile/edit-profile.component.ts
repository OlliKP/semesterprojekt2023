import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {
  user = {
    displayName: localStorage.getItem('displayName'),
    email: localStorage.getItem('email')
  }

  @Input() event: any;

  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  @ViewChild(IonModal) modal: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    this.modal.dismiss('', 'confirm');
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Vil du slette din profil?',
      buttons: [
        {
          text: 'Nej',
          handler: () => {
            console.log('Vil ikke slette');
          },
        },
        {
          text: 'Ja',
          cssClass: 'test',
          handler: () => {
            this.deleteProfile();
          },
        },
      ],
    });
    await alert.present();
  }
  deleteProfile(): void {
    console.log('Vil slette');  
  }

}

/* changePassword() {
    this.modal.navigate(['/password'])
} */