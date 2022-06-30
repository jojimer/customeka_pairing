import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { List } from "../models/Lists";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listsCollection: AngularFirestoreCollection<List>;
  lists:Observable<List[]>;

  constructor(public afs:AngularFirestore) {
    //this.lists = this.afs.collection('lists').valueChanges();
  }

  getList(){
    return this.lists;
  }


}


