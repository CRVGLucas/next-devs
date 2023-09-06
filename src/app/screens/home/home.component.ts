import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  postsCollection: CollectionReference<DocumentData> | any;
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  private getPostsCollectionSubscription = new Subscription();
  postsList: any = []
  constructor(private readonly firestore: Firestore) {
    this.postsCollection = collection(this.firestore, 'aulas');
    this.libAndFrameworkCollection = collection(this.firestore, 'bibliotecas-e-frameworks');
  }

  ngOnInit(): void {
    this.getPostsCollectionSubscription = collectionData(this.postsCollection, {idField: 'id'}).subscribe(
      (lessons) => {
        lessons.map(
          (post: any) => {
            collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
              (plataformas: any) => {
                var plataforma = plataformas.filter((plataforma: any) => plataforma.id == post.idLibFramework)
                post.logo = plataforma[0].logo
              }
            );
          }
        )
        this.postsList = lessons
      }
    )
  }

  ngOnDestroy(): void {
      this.getPostsCollectionSubscription.unsubscribe();
  }


}
