import { Component, OnInit } from '@angular/core';
import { ActionSheetController,
        AlertController,
        ModalController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

/* import { EditComponent } from '../edit/edit.component'; 
import { EditPage } from '../edit/edit/edit.page';*/


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private modalController: ModalController,
    public photoService: PhotoService, 
   /*  private editComponent: EditComponent, 
    private editPage: EditPage,*/
  ) { }

  ngOnInit() {
  }

  addPhotoToGallery () {
    this.photoService.addNewToGallery();
  }

  public alertButtons = [
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
  ];

}

/* async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Vil du slette eller redigere?',
    buttons: [{
      // knap 1
      text: 'Rediger',
      handler: () => {
        this.presentModal(); 
        console.log('Skal redigere');
      }
    },
    // knap 2
    {
      text: 'Slet',
      handler: () => {
        this.presentModal();
        console.log('Skal slette');
      }
    }
  ]
  });
  await actionSheet.present();
}

async presentModal() {
  const modal = await this.modalController.create({
    component: EditPage,
    //componentProps: this.profil redigerer profil-siden
  });
  modal.present();
}

//tilføj en "alert" til at godkende handling ved eks. fjerne fra favorit
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Vil du slette eller redigere?',
    buttons: [
      // 1. knap
      {
        text: 'Rediger profil',
        handler: () => {
          console.log('Skal redigere');
          return false; // stopper alerten
        }
      },
      // 2. knap
      {
        text: 'Slet profil',
        handler: () => {
          console.log('Skal slette');
        }
      }
    ]
  });
  await alert.present();
} */

/* async presentModal () {
  const modal = await this.modalController.create({
    component: this.editComponent,
    componentProps: {Hvis du har nogen proprietær data at sende til modalen} */
  /* });
  modal.present();
} */ 
