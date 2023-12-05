import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  events: Array<any>;
  favoriteEvents: Array<any> = [];
  allEvents: Array<any>;
  showFavorites: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.fetchEvents();
    this.fetchFavoriteEvents();
  }

  makeFavorite(event) {
    if (
      this.favoriteEvents.find(
        (favoriteEvent) => favoriteEvent.eventId === event.eventId
      )
    ) {
      return;
    }

    this.firebaseService.createFavorite({
      Opslag_ID: event.eventId,
      Profil_ID: localStorage.getItem('token'),
    }).then((result) => {
      event.favoritterId = result.id;
    });
    this.favoriteEvents.push(event);

    const eventIndex = this.events.findIndex((e) => {
      return e.eventId === event.eventId;
    });

    const eventInEvents = this.events.find((e) => {
      return e.eventId === event.eventId;
    });

    eventInEvents.favoritterId = true;
    this.events[eventIndex] = eventInEvents;
  }

  undoFavorite(event) {
    this.firebaseService.deleteFavorite(event.favoritterId);
    this.favoriteEvents = this.favoriteEvents.filter((favoriteEvent) => {
      return favoriteEvent.eventId !== event.eventId;
    });

    const eventIndex = this.events.findIndex((e) => {
      return e.eventId === event.eventId;
    });

    const eventInEvents = this.events.find((e) => {
      return e.eventId === event.eventId;
    });

    eventInEvents.favoritterId = false;
    this.events[eventIndex] = eventInEvents;

    const eventIndexInAll = this.allEvents.findIndex((e) => {
      return e.eventId === event.eventId;
    });

    const eventInEventsInAll = this.allEvents.find((e) => {
      return e.eventId === event.eventId;
    });

    eventInEventsInAll.favoritterId = false;
    this.allEvents[eventIndexInAll] = eventInEventsInAll;

    if (this.showFavorites) {
      this.events = this.favoriteEvents;
    }
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
    this.events = !this.showFavorites ? this.allEvents : this.favoriteEvents;
  }

  fetchFavoriteEvents() {
    this.firebaseService.fetchFavoriteEvents().subscribe((data) => {
      this.favoriteEvents = data;

      data.forEach((favoriteEvent) => {
        let favoriteEventInEventsIndex = this.events.findIndex((event) => {
          return event.eventId === favoriteEvent.eventId;
        });
        let favoriteEventInEvents = this.events.find((event) => {
          return event.eventId === favoriteEvent.eventId;
        });

        favoriteEventInEvents.favoritterId = favoriteEvent.favoritterId;
        this.events[favoriteEventInEventsIndex] = favoriteEventInEvents;
      });
    });
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
          profilId: e.payload.doc.data()['profilId'],
          favoritterId: false,
          displayName: e.payload.doc.data()['displayName'],
        };
      });
      this.allEvents = this.events;
    });
  }

  displayNumberOfPerson(event) {
    if (event.minPersons === event.maxPersons) {
      return event.minPersons;
    }
    return event.minPersons + ' - ' + event.maxPersons;
  }


}
