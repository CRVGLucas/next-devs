import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  declarations: [
    UserInfoComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  exports: [
    UserInfoComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
