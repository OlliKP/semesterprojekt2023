import { Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent  implements OnInit {

  showPassword = false;

  @ContentChild(IonInput) input: IonInput;
  @Input() event: any;
  @ViewChild(IonModal) modal: IonModal;
  
  constructor() { }

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    this.modal.dismiss('', 'confirm');
  }
}