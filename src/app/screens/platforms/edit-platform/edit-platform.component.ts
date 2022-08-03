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
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'app/components/toastr/toast.service';
@Component({
  selector: 'app-edit-platform',
  templateUrl: './edit-platform.component.html',
  styleUrls: ['./edit-platform.component.scss']
})
export class EditPlatformComponent implements OnInit {
  platformsCollection: CollectionReference<DocumentData> | any;
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  idPlatform: any
  platforms: any;
  libsAndFrameworks: any = []
  editForm: FormGroup = new FormGroup({
    nome: new FormControl(''),
    logo: new FormControl(''),
  });

  constructor(private readonly firestore: Firestore, private router: Router,private route: ActivatedRoute, private toastr: ToastService) {
    this.platformsCollection = collection(this.firestore, 'plataformas');
    this.libAndFrameworkCollection = collection(this.firestore, 'linguagens-e-frameworks'); 
    this.idPlatform = this.route.snapshot.paramMap.get('id');
    this.getPlatforms()
  }

  getPlatforms() {
    return collectionData(this.platformsCollection, {idField: 'id',}).
      subscribe((plataformas: any) => {
        plataformas.map(
          (plataforma: any) => {
            if(plataforma.id == this.idPlatform){
              console.log('plataforma: ', plataforma);
              this.platforms = plataforma;
              this.editForm.get('nome')?.setValue(plataforma.nome)
              this.editForm.get('logo')?.setValue(plataforma.logo)
            }
          }
        )
      });
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

 

  editPlatform(){
    const editLFReference = doc(this.firestore,`plataformas/${this.idPlatform}`);
    updateDoc(editLFReference, { ...this.editForm.value }).then(
      (success) => {
        this.toastr.showSuccess("Aula editada com sucesso !")
        this.router.navigate(['/platforms'])
      }
    ).catch(
      (error) => {

      }
    )
  }

  ngOnInit(): void {
  }

}
