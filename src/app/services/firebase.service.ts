import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Opslag';

  constructor(
    private firestore: AngularFirestore, 
    private fireauth: AngularFireAuth, 
    private router: Router
  ) { }

  create_event(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_events() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_event(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_event(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }


  // Google login
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message)
    })
  }
}
