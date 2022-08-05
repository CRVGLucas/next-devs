import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-libs-and-frameworks',
  templateUrl: './register-libs-and-frameworks.component.html',
  styleUrls: ['./register-libs-and-frameworks.component.css'],
})
export class RegisterLibsAndFrameworksComponent implements OnInit {
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platformsCollection: CollectionReference<DocumentData> | any;

  platforms: any;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    logo: new FormControl(''),
    idPlatform: new FormControl('',Validators.required),
  });
  constructor(private readonly firestore: Firestore, private toastr: ToastService, private route: Router) {
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.libAndFrameworkCollection = collection(
      this.firestore,
      'bibliotecas-e-frameworks'
    );
  }

  getPlatforms() {
    return collectionData(this.platformsCollection, {
      idField: 'id',
    }).subscribe((plataformas: any) => {
      this.platforms = plataformas;
    });
  }

  registerLibOrFramework(event: FormDataEvent) {
    event.preventDefault();
    const form = this.registerForm.value;
    addDoc(this.libAndFrameworkCollection, form)
      .then((success) => {
        this.toastr.showSuccess("Cadastro realizado com sucesso !")
        this.route.navigate(['/platforms'])
      })
      .catch((error) => {
      });
  }

  ngOnInit(): void {
    this.getPlatforms();
  }
}