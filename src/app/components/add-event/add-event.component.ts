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
  
  ngOnInit() {}
  
  event = {
    eventId: '',
    title: '',
    profilId: localStorage.getItem('token'),
    date: '',
    description: '',
    location: '',
    category: '',
    minPersons: null,
    maxPersons: null,
  };

  @ViewChild(IonModal) modal: IonModal;

  showCalender = false;
  formattedDate: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    formatWeekTitle: `MMM 'uge' w`,
  };

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
    console.log(this.event.date)
    this.formattedDate = format(parseISO(value), 'MMM d, yyyy');
    this.showCalender = false;
  }
}
