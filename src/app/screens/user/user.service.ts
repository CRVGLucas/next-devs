import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersCollection: CollectionReference<DocumentData> | any;
  usersRef: AngularFireList<any> | undefined;
  userRef: AngularFireObject<any> | undefined;
  public isLogged: boolean = false
  constructor(private db: AngularFireDatabase, private readonly firestore: Firestore) { 
    this.usersCollection = collection(this.firestore, 'usuario');
  }

  getUsers(){
    return collectionData(this.usersCollection, {idField: 'id'})
  }

  checkUserIsLogged(){
    const user = localStorage.getItem('next_devs@user')
    const isOnline: boolean = false
    if(user){
      this.isLogged = true
      isOnline = true
    }
    return isOnline
  }


  checkUserIsAdmin(){
    let user: any = localStorage.getItem('next_devs@user')
    let isAdmin: boolean = false
    if(user){
      user = JSON.parse(user)
      isAdmin = user.isAdmin ? true : false
    }
    return isAdmin
  }
  

  newUser(user: User){
    return addDoc(this.usersCollection, user);
  }

}