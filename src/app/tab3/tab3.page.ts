import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // @ViewChild(IonModal) modal: IonModal;

  alertButtons = [
    {
      text: 'Nej',
      handler: () => {
        console.log('nej');
      },
    },
    {
      text: 'Ja',
      // handler: (id) => {
      //   this.deleteEvent(id);
      // },
    },
  ];

  constructor(private alertController: AlertController) {}

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Vil du slette "' + + '"?',
      buttons: [
        {
          text: 'Nej',
          handler: () => {
            console.log('nej');
          },
        },
        {
          text: 'Ja',
          cssClass: 'alert-button-cancel',
          handler: () => {
            this.deleteEvent(event);
          },
        },
      ],
    });
    await alert.present();
  }

  deleteEvent(event: any): void {
    // this.eventsService.delete(event.id).subscribe(
    //   (data) => {
    //     this.retrieveEvents();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }
  
  // save() {
  //   this.modal.dismiss('confirm');
  // }

}
