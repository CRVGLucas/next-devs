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
import { ToastService } from 'app/components/toastr/toast.service';
import { Router } from '@angular/router';


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

  constructor( private readonly firestore: Firestore, private toastr: ToastService, private router: Router) { 
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks');
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.lessonsCollection = collection(this.firestore, 'aulas');

    this.getPlatforms()

  }

  ngOnInit(): void {
  }

  createLesson(){
    if(!this.registerForm.value.idPlatform){
      this.toastr.showError("Obrigatório selecionar uma plataforma")
    } else if(!this.registerForm.value.idLibFramework) {
      this.toastr.showError("Obrigatório selecionar uma biblioteca ou framework")
    } else if(!this.registerForm.value.content) {
      this.toastr.showError("Obrigatório conter algum conteúdo")
    } else {
      addDoc(this.lessonsCollection, this.registerForm.value).then(
        (success) => {
          this.toastr.showSuccess("Cadastrado com sucesso !")
          this.router.navigate(['/platforms'])
        }
      ).catch(
        (error) => {
          this.toastr.showSuccess("Ocorreu um erro ao cadastrar, tente novamente.")
        }
      )
    }
  }

  getLibsAndFrameworks(){
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
        this.platforms = plataformas
      }
    )
  }



}
