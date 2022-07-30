import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsCollection: CollectionReference<DocumentData> | any;
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platform: any;
  postsList: any = []
  constructor(private readonly firestore: Firestore) { 
    this.postsCollection = collection(this.firestore, 'aulas');
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
  }

  getLessons(){
    collectionData(this.postsCollection, {idField: 'id'}).subscribe(
      (lessons) => { 
        lessons.map(
          (post: any) => {
            collectionData(this.libAndFrameworkCollection, {
              idField: 'id',
            }).subscribe((plataformas: any) => {
               var plataforma = plataformas.filter((plataforma: any) => plataforma.id == post.idLibFramework)
               console.log("plataforma: ", plataforma) 
               post.logo = plataforma[0].logo
            });
          }
        )
        this.postsList = lessons
      }
    )
  }

  // getPlatformById(id){
  //   platform
  //   return collectionData(this.platformsCollection, {
  //     idField: 'id',
  //   }).subscribe((plataformas: any) => {
  //     console.log('plataformas: ', plataformas);
  //      = plataformas.filter((plataforma: any) => plataforma.id == id) 
  //   });
  // }

  ngOnInit(): void {
    this.getLessons()
  }

}
