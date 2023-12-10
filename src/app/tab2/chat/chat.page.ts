import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  samtaleId = this.activatedRoute.snapshot.paramMap.get("id");
  messages = [];
  userId = localStorage.getItem("token")

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {this.fetchChatMessages()}

  sendMessage() {
    const record = {
      message: this.message,
      samtalerId: this.samtaleId,
      sender: localStorage.getItem("token"),
      time: new Date()
    };
    this.firebaseService.createMessage(record).then((res) => {
      this.messages.push(record);
      this.message = "";
    });
  }

  fetchChatMessages() {
    this.firebaseService.readChatMessages(this.samtaleId).subscribe((res) => {
      res.forEach((doc) => {
        let data = JSON.parse(JSON.stringify(doc.data()));
        console.log(data)
        let chatMessage = {
          message: data.message,
          time: data.time.seconds*1000,
          sender: data.sender
        }
        this.messages.push(chatMessage);
      })
      this.messages.sort((a, b) => a.time - b.time)
    })
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
