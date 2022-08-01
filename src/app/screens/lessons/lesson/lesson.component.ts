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
import { FavoritesService } from 'app/screens/favorites/favorites.service';
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  idLesson: any
  lessonCollection: CollectionReference<DocumentData> | any;
  favoritesLessonsCollection: CollectionReference<DocumentData> | any;
  lesson: any = []
  hideFavorite: boolean = false
  hideRegister: boolean = true;
  favorited: boolean = false;
  constructor(private route: ActivatedRoute, private readonly firestore: Firestore, private userService: UserService, private favoriteService: FavoritesService) {
    this.idLesson = this.route.snapshot.paramMap.get('id'); 
    this.lessonCollection = collection(this.firestore, 'aulas');
    this.favoritesLessonsCollection = collection(this.firestore, 'favorites-lessons'); 
    this.getLessons()
    this.hideFavorite = this.checkIfLessonIsFavorited()
  }

  addToFavorites(){
    let user: any = localStorage.getItem('next_devs@user')
    user = JSON.parse(user)
    this.favoriteService.saveLessonsToFavorites(user.id, this.idLesson)
    this.hideFavorite = this.checkIfLessonIsFavorited()
  }

  checkIfLessonIsFavorited(){
    let isFavorited: boolean = false
    if(this.userService.checkUserIsLogged()){
      collectionData(this.favoritesLessonsCollection, {idField: 'id'}).subscribe(
        (favorites) => {
          console.log("favorites: ", favorites)
          favorites.map(
            (favorite: any) => {
              if(favorite.lessonId == this.idLesson){
                isFavorited = true
                this.favorited = true
              }
            }
          )
        }
      )
    }
    return isFavorited
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
