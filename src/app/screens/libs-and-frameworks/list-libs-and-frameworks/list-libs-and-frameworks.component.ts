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
import { UserService } from 'app/screens/user/user.service';
@Component({
  selector: 'app-list-libs-and-frameworks',
  templateUrl: './list-libs-and-frameworks.component.html',
  styleUrls: ['./list-libs-and-frameworks.component.css']
})
export class ListLibsAndFrameworksComponent implements OnInit {
  idPlatform: any
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  libsAndFrameworks: any = []
  hideRegister: boolean = true; 

  constructor(private route: ActivatedRoute, private readonly firestore: Firestore, private userService: UserService) {
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
  }

  ngOnInit(): void {
    this.idPlatform = this.route.snapshot.paramMap.get('id');
    this.getLibsAndFrameworks() 
    this.hideRegister = this.userService.checkUserIsAdmin()
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
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
