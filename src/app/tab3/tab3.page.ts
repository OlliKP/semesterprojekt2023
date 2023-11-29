import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  events: any;

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
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.firebaseService.read_events().subscribe((data) => {
      this.events = data.map((e) => {
        return {
          eventId: e.payload.doc.id,
          title: e.payload.doc.data()['Titel'],
          profilId: e.payload.doc.data()['Profil_ID'],
          date: e.payload.doc.data()['Dato'],
          description: e.payload.doc.data()['Beskrivelse'],
          location: e.payload.doc.data()['Lokation'],
          category: e.payload.doc.data()['Kategori'],
          minPersons: e.payload.doc.data()['Min_personer'],
          maxPersons: e.payload.doc.data()['Max_personer'],
        };
      });
    });

    // const event = {
    //   eventId: 1,
    //   title: 'Brætspil',
    //   profilId: 2,
    //   date: '22-12-2023',
    //   description:
    //     ' Hej med jer. Jeg søger nogle buddys som har lyst til at starte en Dungeons & Dragons kampagne sammen med mig. Jeg er selv 28 år, og foretrækker at finde nogle jævnaldrende, som ville være frisk på at spille i et par timer hver uge.',
    //   location: 'Næstved',
    //   category: 'Hygge',
    //   minPersons: 1,
    //   maxPersons: 6,
    // };
    // this.events = [event];
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

  deleteEvent(event: any): void {}
}
