import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { UserRegisterComponent } from './screens/user/user-register/user-register.component';
import { UserLoginComponent } from './screens/user/user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UserService } from './screens/user/user.service';
import { PlatformsComponent } from './screens/platforms/platforms.component';
import { RegisterLibsAndFrameworksComponent } from './screens/libs-and-frameworks/register-libs-and-frameworks/register-libs-and-frameworks.component';
import { ListLibsAndFrameworksComponent } from './screens/libs-and-frameworks/list-libs-and-frameworks/list-libs-and-frameworks.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserRegisterComponent,
    UserLoginComponent,
    PlatformsComponent,
    RegisterLibsAndFrameworksComponent,
    ListLibsAndFrameworksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AngularFirestore, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
