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
import { ToastService } from 'app/shared/toastr/toast.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoritesLFCollection: CollectionReference<DocumentData> | any;
  favoritesLessonsCollection: CollectionReference<DocumentData> | any;
  lessonCollection: CollectionReference<DocumentData> | any;
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  listLFFavorites: any = []
  listLessonsFavorites: any = []
  user: any
  constructor(private readonly firestore: Firestore, private toastr: ToastService) {
    this.favoritesLFCollection = collection(this.firestore, 'bibliotecas-e-frameworks-favoritos');
    this.favoritesLessonsCollection = collection(this.firestore, 'aulas-favoritas');
    this.lessonCollection = collection(this.firestore, 'aulas');
    this.libAndFrameworkCollection = collection(this.firestore, 'bibliotecas-e-frameworks');
    this.user = localStorage.getItem('next_devs@user')
    this.getLessonsFavorites()
    this.getLFFavorites()
    this.hasDuplicates(this.listLessonsFavorites)
    this.hasDuplicates(this.listLFFavorites)
  }

  removeLFFavorite(favorite: any){
    const libAndFrameworkReference = doc(this.firestore, `bibliotecas-e-frameworks-favoritos/${favorite.id}`);
    return deleteDoc(libAndFrameworkReference).then(
      (success) => {
        this.toastr.showSuccess('biblioteca removida dos favoritos')
        this.listLFFavorites = []
        this.getLFFavorites()

      },
      (error) => {
        this.toastr.showError('Erro ao remover a biblioteca')
      }
    )
  }
  removeLessonFavorite(favorite: any){
    const lessonReference = doc(this.firestore, `aulas-favoritas/${favorite.id}`);
    return deleteDoc(lessonReference).then(
      (success) => {
        this.toastr.showSuccess('Aula removida dos favoritos')
        this.listLessonsFavorites = []
        this.getLessonsFavorites()
      },
      (error) => {
        this.toastr.showError('Erro ao remover a aula')
      }
    )
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }

  hasDuplicates(array: any) {
    return (new Set(array)).size !== array.length;
}

  getLessonsFavorites(){
    this.listLessonsFavorites = []
    let user = JSON.parse(this.user)
    collectionData(this.favoritesLessonsCollection, {idField: 'id'}).subscribe(
      (favorites) => {
        favorites.map(
          (favorite: any) => {
            if(favorite.userId == user.id){
              collectionData(this.lessonCollection, {idField: 'id'}).subscribe(
                (lessons) => {
                  lessons.map(
                    (lesson: any) => {
                      if(lesson.id == favorite.lessonId){
                        favorite.title = lesson.title
                        favorite.content = lesson.content
                        favorite.itemId = lesson.id
                        this.listLessonsFavorites.push(favorite)
                      }
                    }
                  )
                }
              )
            }

          }
        )
      }
    )
  }
  getLFFavorites(){
    let user = JSON.parse(this.user)
    collectionData(this.favoritesLFCollection, {idField: 'id'}).subscribe(
      (favorites) => {
        favorites.map(
          (favorite: any) => {
            if(favorite.userId == user.id){
              collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
                (query: any) => {
                  query.map(
                    (queryItem: any) => {
                      if(queryItem.id == favorite.libAndFrameworkId){
                        favorite.logo = queryItem.logo
                        favorite.name = queryItem.name
                        favorite.description = queryItem.description
                        favorite.itemId = queryItem.id
                        this.listLFFavorites.push(favorite)
                      }
                    }
                  )
                }
              )
            }
          }
        )
      }
    )
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.user)
  }

}
