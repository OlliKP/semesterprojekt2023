import { Component, ViewChild, OnInit, OnChanges } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnChanges {
  events: any;
  user: any;

  alertButtons = [
    {
      text: 'Nej',
      handler: () => {
        console.log('nej');
      },
    },
    {
      text: 'Ja',
      handler: (id) => {
        this.deleteEvent(id);
      },
    },
  ];

  constructor(
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.fetchOwnEvents();

  }

  ngOnChanges() {
    this.user = this.auth.currentUser;
    console.log(this.auth.currentUser);
  }

  fetchOwnEvents() {
    this.firebaseService.readEventsByUserId().subscribe((data) => {
      this.events = data.map((e) => {
        return e;
      })
    });
  }

  displayNumberOfPerson(event) {
    if (event.minPersons === event.maxPersons) {
      return event.minPersons;
    }
    return event.minPersons + ' - ' + event.maxPersons;
  }

  async deleteAlert(event: any) {
    const alert = await this.alertController.create({
      header: 'Vil du slette "' + event.title + '"?',
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
    this.firebaseService.deleteEvent(event.eventId);
  }
}
