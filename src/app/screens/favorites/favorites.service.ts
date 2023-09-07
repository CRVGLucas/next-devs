import { Injectable } from '@angular/core';
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
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesLFCollection: CollectionReference<DocumentData> | any;
  favoritesLessonsCollection: CollectionReference<DocumentData> | any;
  constructor(private readonly firestore: Firestore, private toastr: ToastService ) {
    this.favoritesLFCollection = collection(this.firestore, 'bibliotecas-e-frameworks-favoritos');
    this.favoritesLessonsCollection = collection(this.firestore, 'aulas-favoritas');
  }

  saveLibAndFrameworkToFavorites(userId: any, idLibFramework: any){
    let formFavorite = {
      userId: userId,
      libAndFrameworkId: idLibFramework
    }

    addDoc(this.favoritesLFCollection, formFavorite).then(
      (success) => {
        this.toastr.showSuccess("Adicionado aos favoritos")
      },
      (error) => {
        this.toastr.showError("Erro ao adicionar aos favoritos, tente novamente")
      }
    )

  }

  saveLessonsToFavorites(userId: any, idLesson: any) {
    let formFavorite = {
      userId: userId,
      lessonId: idLesson
    }
    addDoc(this.favoritesLessonsCollection, formFavorite).then(
      (success) => {
        this.toastr.showSuccess("Adicionado aos favoritos")
      },
      (error) => {
        this.toastr.showError("Erro ao adicionar aos favoritos, tente novamente")
      }
    )
  }
}
