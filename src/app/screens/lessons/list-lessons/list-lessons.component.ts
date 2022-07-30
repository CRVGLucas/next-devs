import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.css']
})
export class ListLessonsComponent implements OnInit {
  idLibFramework: any
  lessonsCollection: CollectionReference<DocumentData> | any;
  lessonsList: any = []
  hideRegister: boolean = true;
  constructor(private route: ActivatedRoute, private readonly firestore: Firestore, private userService: UserService) {
    this.idLibFramework = this.route.snapshot.paramMap.get('id'); 
    this.lessonsCollection = collection(this.firestore, 'aulas'); 
    this.getLessons()
    this.hideRegister = this.userService.checkUserIsAdmin()
  }

  getLessons(){
    collectionData(this.lessonsCollection, {idField: 'id'}).subscribe(
      (lessons) => this.lessonsList = lessons
    )
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }

  ngOnInit(): void {
    console.log("lib id: ", this.idLibFramework)
  }

}
