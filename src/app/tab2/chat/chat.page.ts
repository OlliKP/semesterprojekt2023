import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  samtaleId = this.activatedRoute.snapshot.paramMap.get('id');
  messages = [];
  userId = localStorage.getItem('token');
  event: any = '';
  chat: any = '';

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  private chatSubscription: Subscription;

  ngOnInit() {
    this.fetchChatMessages();
    this.fetchChat();
  }

  // ngOnDestroy() {
  //   // Unsubscribe from the chat subscription when the component is destroyed
  //   if (this.chatSubscription) {
  //     this.chatSubscription.unsubscribe();
  //   }
  // }

  sendMessage() {
    if (this.message === '') {
      return;
    }
    const record = {
      message: this.message,
      samtalerId: this.samtaleId,
      sender: localStorage.getItem('token'),
      time: new Date(),
    };

    this.firebaseService.createMessage(record).then((res) => {
      this.message = '';
    });
  }

  fetchChatMessages() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    this.chatSubscription = this.firebaseService
      .readChatMessages(this.samtaleId)
      .subscribe((res) => {
        console.log(res);
        this.messages = res.map((doc) => ({
          message: doc.message,
          time: doc.time.seconds * 1000,
          sender: doc.sender,
        }));
      });
  }
  getMessageOuterDisplay(message) {
    if (message.sender !== this.userId) {
      return 'yours messages';
    } else {
      return 'mine messages';
    }
  }

  getMessageInnerDisplay(message) {
    if (message.sender !== this.userId) {
      return 'message last message sender';
    } else {
      return 'message last message reciever';
    }
  }

  fetchChat(){
    this.firebaseService.readChat(this.samtaleId).subscribe((res) => {
      console.log(res.payload.data())
      const data = JSON.parse(JSON.stringify(res.payload.data()));
      this.chat = data
      const eventId = data.Opslag_ID
      console.log(eventId)
      this.firebaseService.readEvent(eventId).subscribe((eventRes) => {
        console.log(eventRes.payload.data())
        this.event = JSON.parse(JSON.stringify(eventRes.payload.data()))
      })
    })
  }

  getOtherChatPersonName() {
    if ( this.event.profilId !== localStorage.getItem('token')){
      return this.event.displayName
    } else {
      return this.chat.displayName
    }
  }

  getOtherChatPersonPhotoURL() {
    if ( this.event.profilId !== localStorage.getItem('token')){
      return this.event.photoURL
    } else {
      return this.chat.photoURL
    }
  }

}
