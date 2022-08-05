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
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'app/components/toastr/toast.service';
@Component({
  selector: 'app-register-platform',
  templateUrl: './register-platform.component.html',
  styleUrls: ['./register-platform.component.scss']
})
export class RegisterPlatformComponent implements OnInit {
  platformsCollection: CollectionReference<DocumentData> | any;

  registerForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    logo: new FormControl(''),
  });

  constructor(private readonly firestore: Firestore, private router: Router, private toastr: ToastService) { 
    this.platformsCollection = collection(this.firestore, 'plataformas');
  }

  getPlatforms() {
    return collectionData(this.platformsCollection, {
      idField: 'id',
    }).subscribe((plataformas: any) => {
      //this.platforms = plataformas;
    });
  }

  registerPlatform(form: any){
    addDoc(this.platformsCollection, this.registerForm.value)
    .then((success) => {
      this.toastr.showSuccess("Cadastrou com sucesso")
      this.router.navigate(['/platforms'])
    })
    .catch((error) => {
    });
   }

  ngOnInit(): void {
  }

}
