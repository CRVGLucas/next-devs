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
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {
  platformsCollection: CollectionReference<DocumentData> | any;
  platforms: any
  constructor(private readonly firestore: Firestore) {
    this.platformsCollection = collection(this.firestore, 'plataformas');
  }

  ngOnInit(): void {
    this.getPlatforms()
  }

  getPlatforms(){
    return collectionData(this.platformsCollection, {idField: 'id'}).subscribe(
      (plataformas: any) => {
        console.log("plataformas: ", plataformas)
        this.platforms = plataformas
      }
    )
  }

}
