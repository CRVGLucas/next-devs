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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/shared/toastr/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/screens/user/user.service';
@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {

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
  idLesson: any
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platformsCollection: CollectionReference<DocumentData> | any;
  lessonCollection: CollectionReference<DocumentData> | any;
  libsAndFrameworks: any = []
  platforms: any = []
  idPlatform = ''
  lesson: any = {}
  hideEdit: boolean = false
  editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    idPlatform: new FormControl('', Validators.required),
    idLibFramework: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  })

  constructor( private readonly firestore: Firestore, private userService: UserService,private toastr: ToastService, private route: ActivatedRoute, private router: Router) {
    this.libAndFrameworkCollection = collection(this.firestore, 'bibliotecas-e-frameworks');
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.lessonCollection = collection(this.firestore, 'aulas');
    this.idLesson = this.route.snapshot.paramMap.get('id');
    this.getPlatforms()
    this.getLesson()
    this.hideEdit = this.userService.checkUserIsAdmin()
  }

  ngOnInit(): void {
  }

  getLesson(){
    collectionData(this.lessonCollection, {idField: 'id'}).subscribe(
      (lessons) => {
        lessons.map(
          (lesson: any) => {
            if(lesson.id == this.idLesson){
              this.lesson = lesson
              this.editForm.get('title')?.setValue(lesson.title)
              this.editForm.get('content')?.setValue(lesson.content)
              this.editForm.get('idPlatform')?.setValue(lesson.idPlatform)
              this.getLibsAndFrameworks()
              this.editForm.get('idLibFramework')?.setValue(lesson.idLibFramework)
            }
          }
        )
      }
    )
  }

  updateLesson(){
    if(!this.editForm.value.idPlatform){
      this.toastr.showError("Obrigatório selecionar uma plataforma")
    } else if(!this.editForm.value.idLibFramework) {
      this.toastr.showError("Obrigatório selecionar uma biblioteca ou framework")
    } else if(!this.editForm.value.content) {
      this.toastr.showError("Obrigatório conter algum conteúdo")
    } else {
      const editLessonReference = doc(
        this.firestore,
        `aulas/${this.idLesson}`
      );
      updateDoc(editLessonReference, { ...this.editForm.value }).then(
        (success) => {
          this.toastr.showSuccess("Aula editada com sucesso !")
          this.router.navigate(['/lesson/',this.idLesson])
        }
      ).catch(
        (error) => {

        }
      )
    }
  }

  getLibsAndFrameworks(){
    collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
      (query: any) => {
        query.map(
          (queryItem: any) => {
            if(queryItem.idPlatform == this.editForm.value.idPlatform){
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
