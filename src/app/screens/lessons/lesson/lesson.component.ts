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
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  idLesson: any
  lessonCollection: CollectionReference<DocumentData> | any;
  lesson: any = []
  constructor(private route: ActivatedRoute, private readonly firestore: Firestore) {
    this.idLesson = this.route.snapshot.paramMap.get('id'); 
    this.lessonCollection = collection(this.firestore, 'aulas');
    this.getLessons()
   }

   getLessons(){
    collectionData(this.lessonCollection, {idField: 'id'}).subscribe(
      (lessons) => {
        this.lesson = lessons.find(
          (lesson: any) => lesson.id == this.idLesson
        )
      }
    )
  }

  ngOnInit(): void {
    console.log("conteúdo da aula aqui: ", this.lesson) 
  }

}
