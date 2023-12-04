import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = 'Opslag';

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {}

  createEvent(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  readEvents() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updateEvent(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteEvent(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  // Google login
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/']);
        console.log(res);
        localStorage.setItem('token', res.user?.uid);
        localStorage.setItem('displayName', res.user?.displayName);
        localStorage.setItem('email', res.user?.email);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  readEventsByUserId(){
    return this.firestore
      .collection(this.collectionName)
      .snapshotChanges()
      .pipe(
        map((events) =>
          events.map((e) => {
            const profilId = e.payload.doc.get('profilId');
            if (profilId === localStorage.getItem('token')) {
              return {
                eventId: e.payload.doc.id,
                title: e.payload.doc.data()['title'],
                date: e.payload.doc.data()['date'],
                description: e.payload.doc.data()['description'],
                location: e.payload.doc.data()['location'],
                category: e.payload.doc.data()['category'],
                minPersons: e.payload.doc.data()['minPersons'],
                maxPersons: e.payload.doc.data()['maxPersons'],
                profilId: profilId,
              };
            }
            return {}
          }).filter((data) => {
            return Object.keys(data).length > 0
          })
        )
      )
  }
}
