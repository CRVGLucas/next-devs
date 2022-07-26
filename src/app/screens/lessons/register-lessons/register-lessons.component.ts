import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register-lessons',
  templateUrl: './register-lessons.component.html',
  styleUrls: ['./register-lessons.component.css']
})
export class RegisterLessonsComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platformsCollection: CollectionReference<DocumentData> | any;
  lessonsCollection: CollectionReference<DocumentData> | any; 
  libsAndFrameworks: any = []
  platforms: any = []
  idPlatform = ''
  registerForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    idPlatform: new FormControl(''),
    idLibFramework: new FormControl(''),
    content: new FormControl(''),
  })

  constructor( private readonly firestore: Firestore) { 
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.lessonsCollection = collection(this.firestore, 'aulas');

    this.getPlatforms()

  }

  ngOnInit(): void {
  }

  createLesson(){
    console.log("form: ", this.registerForm.value)

    if(!this.registerForm.value.idPlatform){

    } else if(!this.registerForm.value.idLibFramework) {

    } else if(!this.registerForm.value.content) {

    } else {
      addDoc(this.lessonsCollection, this.registerForm.value).then(
        (success) => {
          console.log("cadastrado com sucesso !")
        }
      ).catch(
        (error) => {
          console.log("erro ao cadastrar: ", error)
        }
      )
    }
  }

  getLibsAndFrameworks(){
    console.log("id platform: ", this.registerForm.value.idPlatform)
    collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
      (query: any) => {
        query.map(
          (queryItem: any) => {
            if(queryItem.idPlatform == this.registerForm.value.idPlatform){
              this.libsAndFrameworks.push(queryItem)
            }
          }
        )
      }
    )  
  }

  getPlatforms(){
    return collectionData(this.platformsCollection, {idField: 'id'}).subscribe(
      (plataformas: any) => {
        console.log("plataformas: ", plataformas)
        this.platforms = plataformas
      }
    )
  }



}
