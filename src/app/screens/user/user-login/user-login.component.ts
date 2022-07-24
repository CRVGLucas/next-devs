import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.interface';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  usersCollection: CollectionReference<DocumentData> | any;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private readonly firestore: Firestore, private userService: UserService) { }

  ngOnInit(): void {
  }

  loginUser(user: User){
    this.userService.getUsers().subscribe(
      (users: any) => {
        let userExist = users.find(
          (userFind: User) => {
            return user.email == userFind.email && user.password == userFind.password
          }
        ) 
        if(userExist){
          console.log("Usuário: ", userExist)
        } else {
          throw new Error("Usuário ou senha incorretos.")
        }
      }
    )

  }

}
