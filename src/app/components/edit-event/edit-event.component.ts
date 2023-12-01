import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic2-calendar';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent  implements OnInit {
  @Input() event: any;

  constructor(private firebaseService: FirebaseService) { }

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
    this.modal.dismiss('', 'confirm');
    this.firebaseService.update_event(this.event.eventId, this.event);
  }

  datePicked(value: any) {
    this.event.date = value.split('T')[0];
    this.event.date = value;
    this.formattedDate = format(parseISO(value), 'MMM d, yyyy');
    this.showCalender = false;
  }
}
