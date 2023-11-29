import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic2-calendar';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  
  eventId?: string;
  title: string;
  profilId: number;
  date: any;
  description: string;
  location: string;
  category: string;
  minPersons: number;
  maxPersons: number;

  constructor() {}

  ngOnInit() {}

  @ViewChild(IonModal) modal: IonModal;

  showCalender = false;
  formattedDate: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    formatHourColumn: 'H:mm',
    formatWeekTitle: `MMM 'uge' w`,
  };

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    this.modal.dismiss('', 'confirm');
  }

  datePicked(value: any) {
    this.date = value;
    this.formattedDate = format(parseISO(value), 'MMM d, yyyy');
    this.showCalender = false;
  }
}
