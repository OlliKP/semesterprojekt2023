import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router,
    private auth: Auth
  ) {}

  createEvent(record) {
    return this.firestore.collection('Opslag').add(record);
  }

  readEvents() {
    return this.firestore.collection('Opslag').snapshotChanges();
  }

  updateEvent(recordID, record) {
    this.firestore.doc('Opslag' + '/' + recordID).update(record);
  }

  deleteEvent(record_id) {
    this.firestore.doc('Opslag' + '/' + record_id).delete();
  }

  // Google login
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/introduction']);
        console.log(res.user);
        localStorage.setItem('token', res.user?.uid);
        localStorage.setItem('displayName', res.user?.displayName);
        localStorage.setItem('email', res.user?.email);
        localStorage.setItem('photoURL', res.user?.photoURL);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  readEventsByUserId() {
    return this.firestore
      .collection('Opslag')
      .snapshotChanges()
      .pipe(
        map((events) =>
          events
            .map((e) => {
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
              return {};
            })
            .filter((data) => {
              return Object.keys(data).length > 0;
            })
        )
      );
  }

  createFavorite(record) {
    return this.firestore.collection('Favoritter').add(record);
  }

  deleteFavorite(record_id) {
    this.firestore.doc('Favoritter' + '/' + record_id).delete();
  }

  fetchFavoriteEvents(): Observable<any[]> {
    return this.firestore
      .collection('Favoritter', (ref) =>
        ref.where('Profil_ID', '==', localStorage.getItem('token'))
      )
      .get()
      .pipe(
        switchMap((data) => {
          const observables = data.docs.map((e) => {
            const opslagId = JSON.parse(JSON.stringify(e.data())).Opslag_ID;
            const favoritterId = e.id;
            // Return an observable for each inner Firestore call

            return this.firestore
              .collection('Opslag')
              .doc(opslagId)
              .get()
              .pipe(
                map((innerData) => ({
                  favoritterId,
                  eventId: opslagId,
                  title:
                    JSON.parse(JSON.stringify(innerData.data()))?.title || '',
                  date:
                    JSON.parse(JSON.stringify(innerData.data()))?.date || null,
                  description:
                    JSON.parse(JSON.stringify(innerData.data()))?.description ||
                    '',
                  location:
                    JSON.parse(JSON.stringify(innerData.data()))?.location ||
                    '',
                  category:
                    JSON.parse(JSON.stringify(innerData.data()))?.category ||
                    '',
                  minPersons:
                    JSON.parse(JSON.stringify(innerData.data()))?.minPersons ||
                    0,
                  maxPersons:
                    JSON.parse(JSON.stringify(innerData.data()))?.maxPersons ||
                    0,
                  profilId:
                    JSON.parse(JSON.stringify(innerData.data()))?.profilId ||
                    '',
                  displayName:
                    JSON.parse(JSON.stringify(innerData.data()))?.displayName ||
                    '',
                }))
              );
          });

          // Use forkJoin to wait for all inner observables to complete
          return forkJoin(observables);
        })
      );
  }

  // Chat

  createChat(record) {
    return this.firestore.collection('Samtaler').add(record);
  }

  readChats() {
    return this.firestore
      .collection('Samtaler', (ref) =>
        ref.where('Profil_ID', '==', localStorage.getItem('token'))
      )
      .get()
      .pipe(
        switchMap((data) => {
          const observables = data.docs.map((e) => {
            const opslagId = JSON.parse(JSON.stringify(e.data())).Opslag_ID;
            // Return an observable for each inner Firestore call

            return this.firestore
              .collection('Opslag')
              .doc(opslagId)
              .get()
              .pipe(
                map((innerData) => ({
                  eventId: opslagId,
                  title:
                    JSON.parse(JSON.stringify(innerData.data()))?.title || '',
                  profilId:
                    JSON.parse(JSON.stringify(innerData.data()))?.profilId ||
                    '',
                  displayName:
                    JSON.parse(JSON.stringify(innerData.data()))?.displayName ||
                    '',
                }))
              );
          });

          // Use forkJoin to wait for all inner observables to complete
          return forkJoin(observables);
        })
      );
  }

  readChats2(){
    return this.firestore
      .collection('Samtaler', (ref) =>
        ref.where('Profil_ID', '==', localStorage.getItem('token'))
      )
      .get()
      .pipe(
        switchMap((data) => {
          const observables = data.docs.map((e) => {
            const opslagId = JSON.parse(JSON.stringify(e.data())).Opslag_ID;
            // Return an observable for each inner Firestore call

            return this.firestore
              .collection('Opslag', (ref) => ref.where('profilId', '==', localStorage.getItem('token')))
            
              .get()
              .subscribe((res) => {
                res.forEach((doc) => {
                  let data = JSON.parse(JSON.stringify(doc.data()));
                  console.log(data)
                  return {
                    message: data.message,
                    time: data.time.seconds*1000,
                    sender: data.sender
                  }
                })
              })
          });

          // Use forkJoin to wait for all inner observables to complete
          return forkJoin(observables);
        })
      );
  }

  createMessage(record) {
    return this.firestore.collection('Samtale_info').add(record);
  }

  readChatMessages(samtaleId) {
    return this.firestore
      .collection('Samtale_info', (ref) =>
        ref.where('samtalerId', '==', samtaleId)
      )
      .get();
  }
}
