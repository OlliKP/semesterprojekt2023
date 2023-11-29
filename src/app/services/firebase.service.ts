import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Opslag';

  constructor(
    private firestore: AngularFirestore
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
}
