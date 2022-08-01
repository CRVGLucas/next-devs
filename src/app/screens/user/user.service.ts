import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs';
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
  constructor(private db: AngularFireDatabase, private readonly firestore: Firestore) { 
    this.usersCollection = collection(this.firestore, 'usuario');
  }

  getUsers(){
    return collectionData(this.usersCollection, {idField: 'id'})
  }

  checkUserIsLogged(){
    const user = localStorage.getItem('next_devs@user')
    return user ? true : false
  }


  checkUserIsAdmin(){
    let user: any = localStorage.getItem('next_devs@user')
    if(user){
      user = JSON.parse(user)
      console.log("user: ", user)
      if(user.isAdmin){
        console.log("é admin")
        return true
      }
      return false
    }
    console.log("Não cai nem no if")
    return false
  }
  

  newUser(user: User){
    return addDoc(this.usersCollection, user);
  }

}