import { ToastService } from './components/toastr/toast.service';
import { ToastrComponent } from './components/toastr/toastr.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UserService } from './screens/user/user.service';
import { RegisterLibsAndFrameworksComponent } from './screens/libs-and-frameworks/register-libs-and-frameworks/register-libs-and-frameworks.component';
import { ListLibsAndFrameworksComponent } from './screens/libs-and-frameworks/list-libs-and-frameworks/list-libs-and-frameworks.component';
import { ListLessonsComponent } from './screens/lessons/list-lessons/list-lessons.component';
import { RegisterLessonsComponent } from './screens/lessons/register-lessons/register-lessons.component';
import { LessonComponent } from './screens/lessons/lesson/lesson.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlatformsComponent } from './screens/platforms/platforms.component';
import { RegisterPlatformComponent } from './screens/platforms/register-platform/register-platform.component';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { AuxiliaryFunctions } from './components/auxiliary-functions.service';
import { FavoritesComponent } from './screens/favorites/favorites.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserRegisterComponent,
    UserLoginComponent,
    RegisterLibsAndFrameworksComponent,
    ListLibsAndFrameworksComponent,
    ListLessonsComponent,
    RegisterLessonsComponent,
    LessonComponent,
    PlatformsComponent,
    RegisterPlatformComponent,
    LoaderComponent,
    ToastrComponent,
    FavoritesComponent
  ],
  imports: [
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    NgbModule,
    NgbCollapseModule,
  ],
  providers: [AngularFirestore, UserService, ToastService, AuxiliaryFunctions],
  bootstrap: [AppComponent],
})
export class AppModule {}