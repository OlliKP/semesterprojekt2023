import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PasswordComponent } from './password/password.component';
import { RouterModule } from '@angular/router';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      RouterModule,
    ],
    declarations: [
      AddEventComponent,
      EditEventComponent,
      EditProfileComponent,
      PasswordComponent,
      ShowHidePasswordComponent
    ],
    exports: [AddEventComponent, EditEventComponent, EditProfileComponent, PasswordComponent, ShowHidePasswordComponent]
  })
  export class SharedModule { }