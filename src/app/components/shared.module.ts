import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
    ],
    declarations: [
      AddEventComponent,
      EditEventComponent,
      EditProfileComponent
    ],
    exports: [AddEventComponent, EditEventComponent, EditProfileComponent]
  })
  export class SharedModule { }