import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic2-calendar';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  
  
  constructor(private firebaseService: FirebaseService, private auth: Auth) {}
  
  ngOnInit() {
    console.log(new Date().toISOString)
  }
  
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date().toISOString().split('T')[0],
    formatWeekTitle: `MMM 'uge' w`,
  };

  event = {
    eventId: '',
    title: '',
    profilId: localStorage.getItem('token'),
    date: this.calendar.currentDate,
    description: '',
    location: '',
    category: '',
    minPersons: null,
    maxPersons: null,
    displayName: this.auth.currentUser?.displayName,
    photoURL: this.auth.currentUser?.photoURL
  };

  @ViewChild(IonModal) modal: IonModal;

  showCalender = false;
  formattedDate: string;



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    this.event.profilId = this.auth.currentUser.uid
    this.firebaseService.createEvent(this.event).then((response) => {
      console.log(response);
    });
    this.modal.dismiss('', 'confirm');
  }

  datePicked(value: any) {
    this.event.date = value.split('T')[0];
    console.log(value);
    this.formattedDate = format(parseISO(value), 'MMM d, yyyy');
    this.showCalender = false;
  }
}
