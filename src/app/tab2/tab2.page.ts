import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  chats = []

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.fetchChatsStartedByMe()

    this.firebaseService.readChatsStartedWithMe().subscribe((res)=>{
      res.forEach((docs) => {
        docs.forEach((doc) => {
          console.log(doc)
            this.chats.push(doc)
        })
      })
    })
  }

  fetchChatsStartedByMe() {
    this.firebaseService.readChatsStartedByMe().subscribe((res)=>{
      res.forEach((doc) => {
        this.chats.push(doc)
      })
    })
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  }


}
