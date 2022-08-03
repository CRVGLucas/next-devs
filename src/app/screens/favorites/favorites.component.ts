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
import { ToastService } from 'app/components/toastr/toast.service';
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
  constructor(private readonly firestore: Firestore, private toastr: ToastService) { 
    this.favoritesLFCollection = collection(this.firestore, 'favorites-libs-and-frameworks'); 
    this.favoritesLessonsCollection = collection(this.firestore, 'favorites-lessons'); 
    this.lessonCollection = collection(this.firestore, 'aulas');
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');

    this.getLessonsFavorites()
    this.getLFFavorites()
    this.hasDuplicates(this.listLessonsFavorites)
    this.hasDuplicates(this.listLFFavorites)
  }

  removeLFFavorite(favorite: any){
    console.log("favorite: ", favorite)
    const libAndFrameworkReference = doc(this.firestore, `favorites-libs-and-frameworks/${favorite.id}`);
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
    const lessonReference = doc(this.firestore, `favorites-lessons/${favorite.id}`);
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
    collectionData(this.favoritesLessonsCollection, {idField: 'id'}).subscribe(
      (favorites) => {
        favorites.map(
          (favorite: any) => {
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
        )
      }
    )
  }
  getLFFavorites(){
    collectionData(this.favoritesLFCollection, {idField: 'id'}).subscribe(
      (favorites) => {
        favorites.map(
          (favorite: any) => {
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
        )
      }
    )
  }

  ngOnInit(): void {

  }

}
