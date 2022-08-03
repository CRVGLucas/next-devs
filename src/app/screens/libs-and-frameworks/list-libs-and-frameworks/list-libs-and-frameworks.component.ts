import { ActivatedRoute, Router } from '@angular/router';
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
import { ToastService } from 'app/components/toastr/toast.service';
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

  
  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastService, private readonly firestore: Firestore, private userService: UserService) {
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks'); 
    this.hideRegister = this.userService.checkUserIsAdmin() 
  }

  ngOnInit(): void {
    this.idPlatform = this.route.snapshot.paramMap.get('id');
    this.getLibsAndFrameworks() 
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }

  deleteLibsAndFrameworksOfPlatform(lib: any){
    const lfReference = doc(this.firestore, `linguagens-e-frameworks/${lib.id}`);
    return deleteDoc(lfReference).then(
      (success) => {
        this.toastr.showSuccess('Biblioteca deletada')
      },
      (error) => {
        this.toastr.showError('Erro ao deletar a Biblioteca')
      }
    )
  }

  deletePlatform(){
    const platformReference = doc(this.firestore, `plataformas/${this.idPlatform}`);
    deleteDoc(platformReference).then(
      (success) => {
        console.log("deletou: ", success)
        this.libsAndFrameworks.map(
          (lib: any) => {
            this.deleteLibsAndFrameworksOfPlatform(lib)
          }
        )
        this.toastr.showSuccess('Biblioteca deletada com as bibliotecas e Frameworks')
        this.router.navigate(['/platforms'])
      },
      (error) => {
        this.toastr.showError('Erro ao deletar a Biblioteca')
      }
    )
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
