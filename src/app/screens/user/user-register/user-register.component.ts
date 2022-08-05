import { User } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CollectionReference,
  DocumentData,
} from '@firebase/firestore';
import { UserService } from '../user.service';
import { ToastService } from 'app/components/toastr/toast.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  usersCollection: CollectionReference<DocumentData> | any;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')  
  })

  constructor(private userService: UserService, private auth: AngularFireAuth, private toastr: ToastService, private router: Router) {}
  loading: boolean = false
  ngOnInit(): void {}

  registerUser(user: User){
    if(user.password.length < 6){
      this.toastr.showError("A senha precisa ter mais de 6 caracteres")
    } else if(!user.email){
      this.toastr.showError("O campo e-mail é obrigatório")
    } else {
      this.loading = true
      this.userService.getUsers().subscribe(
        (users: any) => {
          let userFound = users.filter(
            (userList: User) => {
              return userList.email == user.email
            }
          )
          if(userFound && userFound.length > 0){
            this.loading = false
            this.toastr.showError("Uma conta já foi cadastrada com este e-mail, tente usar outro e-mail.")
            return
          } else {
            user.createdAt =  new Date()
            this.userService.newUser(user).then(
              (success) => {
                this.loading = false
                this.toastr.showSuccess("Cadastro realizado com sucesso !")
                this.router.navigate(['/login'])
              }
            ).catch(
              (error) => {
                this.loading = false
              }
            )
          }
        }
      )
    }
  }

}
