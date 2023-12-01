import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpretPageRoutingModule } from './opret-routing.module';

import { OpretPage } from './opret.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpretPageRoutingModule
  ],
  declarations: [OpretPage]
})
export class OpretPageModule {}
