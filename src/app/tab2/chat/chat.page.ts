import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  message = '';
  samtaleId = this.activatedRoute.snapshot.paramMap.get("id");
  messages = [];
  userId = localStorage.getItem("token")

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,

  ) {}
  private chatSubscription: Subscription

  ngOnInit() {
    this.fetchChatMessages();
  }

  ngOnDestroy() {
    // Unsubscribe from the chat subscription when the component is destroyed
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }

  sendMessage() {
    if(this.message === "") {
      return;
    }
    const record = {
      message: this.message,
      samtalerId: this.samtaleId,
      sender: localStorage.getItem("token"),
      time: new Date()
    };
    this.message = ""

    this.firebaseService.createMessage(record).then((res) => {
    });
  }

  fetchChatMessages() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }

    this.chatSubscription = this.firebaseService.readChatMessagesRealtime(this.samtaleId).subscribe((res) => {
      this.messages = res.map((doc) => ({
        message: doc.message,
        time: doc.time.seconds * 1000,
        sender: doc.sender
      }));
    });
  }
  getMessageOuterDisplay(message){
    if(message.sender !== this.userId){
      return 'yours messages'
    } else {
      return 'mine messages';
    }
  }

  getMessageInnerDisplay(message) {
    if(message.sender !== this.userId){
      return "message last message sender"
    } else {
      return "message last message reciever"
    }
  }
}
