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
import { ToastService } from 'app/components/toastr/toast.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
@Component({
  selector: 'app-edit-lib-and-framework',
  templateUrl: './edit-lib-and-framework.component.html',
  styleUrls: ['./edit-lib-and-framework.component.scss']
})
export class EditLibAndFrameworkComponent implements OnInit {
  libAndFrameworkCollection: CollectionReference<DocumentData> | any;
  platformsCollection: CollectionReference<DocumentData> | any;
  idLibFramework: any
  platforms: any;
  libAndFramework: any
  editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    idPlatform: new FormControl(''),
  });

  constructor(private readonly firestore: Firestore, private toastr: ToastService, private router: Router, private route: ActivatedRoute) {
    this.idLibFramework = this.route.snapshot.paramMap.get('id'); 
    this.getLibAndFramework()
    this.getPlatforms()
  }

  getLibAndFramework(){
    collectionData(this.libAndFrameworkCollection, {idField: 'id'}).subscribe(
      (query: any) => {
        query.map(
          (queryItem: any) => {
            if(queryItem.id == this.idLibFramework){
              this.libAndFramework = queryItem
              this.editForm.get("name")?.setValue(queryItem.name)
              this.editForm.get("description")?.setValue(queryItem.description)
              this.editForm.get("logo")?.setValue(queryItem.logo)
              this.editForm.get("idPlatform")?.setValue(queryItem.idPlatform)
            }
          }
        )
      }
    )  
  }

  getPlatforms() {
    return collectionData(this.platformsCollection, {
      idField: 'id',
    }).subscribe((plataformas: any) => {
      this.platforms = plataformas;
    });
  }

  editLibAndFramework(){
    const editLFReference = doc(this.firestore,`linguagens-e-frameworks/${this.idLibFramework}`);
    updateDoc(editLFReference, { ...this.editForm.value }).then(
      (success) => {
        this.toastr.showSuccess("Aula editada com sucesso !")
        this.router.navigate(['/platforms'])
      }
    ).catch(
      (error) => {
        this.toastr.showError("Erro ao editar, tente novamente.")
      }
    )
  }

  ngOnInit(): void {
  }

}
