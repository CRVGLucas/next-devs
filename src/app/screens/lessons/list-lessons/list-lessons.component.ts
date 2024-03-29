import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ToastService } from 'app/shared/toastr/toast.service';
@Component({
  selector: 'app-list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.css']
})
export class ListLessonsComponent implements OnInit {
  idLibFramework: any
  lessonsCollection: CollectionReference<DocumentData> | any;
  favoritesLFCollection: CollectionReference<DocumentData> | any;
  lessonsList: any = []
  isAdmin: boolean = false;
  hideFavorite: boolean = false;
  favorited: boolean = false;
  isLogged: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastService, private readonly firestore: Firestore, private userService: UserService, private favoriteService: FavoritesService) {
    this.idLibFramework = this.route.snapshot.paramMap.get('id');
    this.favoritesLFCollection = collection(this.firestore, 'bibliotecas-e-frameworks-favoritos');
    this.lessonsCollection = collection(this.firestore, 'aulas');
    this.getLessons()
    this.isLogged = localStorage.getItem('next_devs@user') ? true : false;
    this.isAdmin = this.userService.checkUserIsAdmin()
    this.hideFavorite = this.checkIfLibFrameworkIsFavorited()
  }

  addToFavorites(){
    let user: any = localStorage.getItem('next_devs@user')
    user = JSON.parse(user)
    this.favoriteService.saveLibAndFrameworkToFavorites(user.id, this.idLibFramework)
    this.hideFavorite = this.checkIfLibFrameworkIsFavorited()
  }

  checkIfLibFrameworkIsFavorited(){
    let isFavorited: boolean = false
    let user: any = localStorage.getItem('next_devs@user')
    user = JSON.parse(user)
    if(this.userService.checkUserIsLogged()){
      collectionData(this.favoritesLFCollection, {idField: 'id'}).subscribe(
        (favorites) => {
          favorites.map(
            (favorite: any) => {
              if(favorite.libAndFrameworkId == this.idLibFramework && favorite.userId == user.id){
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
    collectionData(this.lessonsCollection, {idField: 'id'}).subscribe(
      (lessons) => {
        lessons.map(
          (lesson: any) => {
            if(lesson.idLibFramework == this.idLibFramework){
              this.lessonsList.push(lesson)
            }
          }
        )

      }
    )
  }

  removeLibAndFramework() {
    const lfReference = doc(this.firestore, `bibliotecas-e-frameworks/${this.idLibFramework}`);
    deleteDoc(lfReference).then(
      (success) => {
        this.toastr.showSuccess('Deletado com sucesso')
        this.router.navigate(['/platforms'])
      },
      (error) => {
        this.toastr.showError('Erro ao deletar ')
      }
    )
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }

  ngOnInit(): void {
  }

}
