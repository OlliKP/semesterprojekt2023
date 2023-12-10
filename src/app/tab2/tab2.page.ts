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
    this.fetchChats()

    this.firebaseService.readChats2().subscribe((res)=>{
      res.forEach((doc) => {
        console.log(doc)
        this.chats.push(doc)
      })
    })
  }

  fetchChats() {
    this.firebaseService.readChats().subscribe((res)=>{
      res.forEach((doc) => {
        this.chats.push(doc)
      })
    })
  }

}
