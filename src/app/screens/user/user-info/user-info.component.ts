import { User } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CollectionReference,
  DocumentData,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { UserService } from '../user.service';
import { ToastService } from 'app/components/toastr/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { HeaderService } from 'app/components/header/header.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  usersCollection: CollectionReference<DocumentData> | any;

  editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)  
  })
  loading: boolean = false
  user: any = localStorage.getItem('next_devs@user')
  constructor(private readonly firestore: Firestore, private userService: UserService, private headerService: HeaderService,  private router: Router,private route: ActivatedRoute, private toastr: ToastService) { 
    this.user = JSON.parse(this.user)

    this.editForm.get('name')?.setValue(this.user.name)
    this.editForm.get('email')?.setValue(this.user.email)
    this.editForm.get('password')?.setValue(this.user.password)
  }

  ngOnInit(): void {
  }

  editUsers(){
    if(this.editForm.get('email')?.value !== '' && this.editForm.get('password')?.value !== ''){

      if(this.editForm.get('email')?.value.length > 6){
        this.userService.getUsers().subscribe(
            (users: any) => {
            let userExist = users.find(
              (userFind: any) => {
                return  this.editForm.get('email')?.value == userFind.email && this.user.id != userFind.id
              }
            ) 
            this.loading = false
            if(userExist){
              localStorage.setItem('next_devs@user', JSON.stringify(userExist))
              this.toastr.showError("email já existe")
            } else {
              const editUserReference = doc(this.firestore,`usuario/${this.user.id}`);
              updateDoc(editUserReference, { ...this.editForm.value }).then(
                (success) => {
                  this.userService.getUsers().subscribe(
                    (users: any) => {
                      let userExist = users.find(
                        (userFind: any) => {
                          return this.user.id == userFind.id
                        }
                      ) 
                      this.loading = false
                      if(userExist){
                        localStorage.setItem('next_devs@user', JSON.stringify(userExist))
                        this.toastr.showSuccess("usuário alterado com sucesso !")
                        this.headerService.updateResultList(true)
                        this.router.navigate(['/'])
                      }
                    }
                  )
                }
              ).catch(
                (error) => {
          
                }
              )
            }
          }
        )
      } else {
        this.toastr.showSuccess("a senha deve ser maior que 6 caractéres")
      }

    } else {
      this.toastr.showSuccess("usuário alterado com sucesso !")
    }

  }

}
