import { User } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CollectionReference, DocumentData } from '@firebase/firestore';
import { UserService } from '../user.service';
import { ToastService } from 'app/shared/toastr/toast.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  usersCollection: CollectionReference<DocumentData> | any;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  users: any = []
  userFound: any
  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private toastr: ToastService,
    private router: Router
  ) {

  }
  loading: boolean = false;
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => this.users = data
    )
  }

  createUser(user: User){
    this.userService
    .newUser(user)
    .then((success) => {
      this.loading = false;
      this.toastr.showSuccess('Cadastro realizado com sucesso !');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      this.loading = false;
    });
  }

  saveUser(event: any) {
    event.preventDefault()
    const user = this.registerForm.value

    if (user.password.length < 6) {
      return this.toastr.showError('A senha precisa ter mais de 6 caracteres');
    }
    if (!user.email) {
      return this.toastr.showError('O campo e-mail é obrigatório');
    }
    this.loading = true;

    if(this.users.length > 0){
      this.userFound = this.users.findIndex((userEmail: User) => user.email == userEmail.email)
      if (this.userFound >= 0) {
        this.loading = false;
        this.toastr.showError('Uma conta já foi cadastrada com este e-mail, tente usar outro e-mail.');
        return
      }
      this.userFound = null
      user.createdAt = new Date();
      this.createUser(user)
    }

  }
}
