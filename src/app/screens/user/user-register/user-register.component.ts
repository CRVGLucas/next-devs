import { User } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CollectionReference,
  DocumentData,
} from '@firebase/firestore';
import { UserService } from '../user.service';


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
    password: new FormControl(''),
  })

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  registerUser(user: User){
    if(user.password.length < 6){
      throw new Error("A senha precisa ter mais de 6 caractéres")
    } else if(!user.email){
      throw new Error("O campo e-mail é obrigatório")
    } else {
      this.userService.getUsers().subscribe(
        (users: any) => {
          let userFound = users.filter(
            (userList: User) => {
              return userList.email == user.email
            }
          )

          if(userFound && userFound.length > 0){
            throw new Error("Uma conta já foi cadastrada com este e-mail, tente usar outro e-mail.")
          } else {
            user.createdAt =  new Date()
            this.userService.newUser(user).then(
              (success) => {
                console.log("Funcionou !: ", success)
              }
            ).catch(
              (error) => {
                console.log("Deu erro: ", error)
              }
            )
          }
        }
      )
    }
  }

}
