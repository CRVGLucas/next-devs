import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-list-libs-and-frameworks',
  templateUrl: './list-libs-and-frameworks.component.html',
  styleUrls: ['./list-libs-and-frameworks.component.css']
})
export class ListLibsAndFrameworksComponent implements OnInit {
  idPlatform: any
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  libsAndFrameworks: any = []
  constructor(private route: ActivatedRoute, private readonly firestore: Firestore) {
    this.idPlatform = this.route.snapshot.paramMap.get('id');
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
    this.getLibsAndFrameworks()
  }

  ngOnInit(): void {
    console.log("libs: ", this.libsAndFrameworks)
  }

  getLibsAndFrameworks(){
    collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
      (query: any) => {
        query.map(
          (queryItem: any) => {
            if(queryItem.idPlatform == this.idPlatform){
              this.libsAndFrameworks.push(queryItem)
            }
          }
        )
      }
    )  
  }

}
