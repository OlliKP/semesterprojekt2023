import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic2-calendar';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  event = {
    eventId: '',
    title: '',
    profilId: 0,
    date: '',
    description: '',
    location: '',
    category: '',
    minPersons: 0,
    maxPersons: 0,
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

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
    this.firebaseService.create_event(this.event).then((response) => {
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
