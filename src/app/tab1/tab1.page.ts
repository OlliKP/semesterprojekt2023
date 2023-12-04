import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  events: any;

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.firebaseService.readEvents().subscribe((data) => {
      this.events = data.map((e) => {
        return {
          eventId: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          date: e.payload.doc.data()['date'],
          description: e.payload.doc.data()['description'],
          location: e.payload.doc.data()['location'],
          category: e.payload.doc.data()['category'],
          minPersons: e.payload.doc.data()['minPersons'],
          maxPersons: e.payload.doc.data()['maxPersons'],
        };
      });
    });
  }

  displayNumberOfPerson(event) {
    if (event.minPersons === event.maxPersons) {
      return event.minPersons;
    }
    return event.minPersons + ' - ' + event.maxPersons;
  }

}
