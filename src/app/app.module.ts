import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { UserModule } from './screens/user/user.module';
import { UserService } from './screens/user/user.service';
import { environment } from '../environments/environment';
import { ToastService } from './shared/toastr/toast.service';
import { LessonsModule } from './screens/lessons/lessons.module';
import { PlatformsModule } from './screens/platforms/platforms.module';
import { FavoritesModule } from './screens/favorites/favorites.module';
import { LibsAndFrameworksModule } from './screens/libs-and-frameworks/libs-and-frameworks.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
// FIREBASE MODULES
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    NgbModule,
    UserModule,
    SharedModule,
    BrowserModule,
    LessonsModule,
    FavoritesModule,
    PlatformsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbCollapseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule,
    LibsAndFrameworksModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [AngularFirestore, UserService, ToastService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
