import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-register-libs-and-frameworks',
  templateUrl: './register-libs-and-frameworks.component.html',
  styleUrls: ['./register-libs-and-frameworks.component.css']
})
export class RegisterLibsAndFrameworksComponent implements OnInit {
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platformsCollection: CollectionReference<DocumentData> | any;

  platforms: any

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    idPlatform: new FormControl(''),
  })
  constructor(private readonly firestore: Firestore) { 
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
  }

  getPlatforms(){
    return collectionData(this.platformsCollection, {idField: 'id'}).subscribe(
      (plataformas: any) => {
        console.log("plataformas: ", plataformas)
        this.platforms = plataformas
      }
    )
  }

  registerLibOrFramework(form: any){
    console.log("o que veio aqui: ", form)
    addDoc(this.libAndFrameworkCollection, form).then(
      (success) => {
        console.log("cadastrou com sucesso !")
      }
    ).catch(
      (error) => {
        console.log("deu erro: ", error)
      }
    )
  }

  ngOnInit(): void {
    this.getPlatforms()

  }
}
