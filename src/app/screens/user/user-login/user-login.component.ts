import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/shared/toastr/toast.service';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { HeaderService } from 'app/shared/header/header.service';
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

  constructor(private readonly firestore: Firestore, private headerService: HeaderService, private auth: AngularFireAuth, private route: Router,private userService: UserService, private toastr: ToastService) { }
  loading: boolean = false
  ngOnInit(): void {
  }

  loginUser(user: User){
    this.loading = true
    this.userService.getUsers().subscribe(
      (users: any) => {
        let userExist = users.find(
          (userFind: User) => {
            return user.email == userFind.email && user.password == userFind.password
          }
        )
        this.loading = false
        if(userExist){
          localStorage.setItem('next_devs@user', JSON.stringify(userExist))
          this.toastr.showSuccess("Login realizado com sucesso !")
          this.userService.isLogged = true
          this.headerService.updateResultList(true)
          this.route.navigate(['/'])
        } else {
          this.toastr.showError("Usuário ou senha incorretos.")
        }
      }
    )

  }

}
