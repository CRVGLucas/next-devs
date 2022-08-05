import { RegisterLessonsComponent } from './screens/lessons/register-lessons/register-lessons.component';
import { PlatformsComponent } from './screens/platforms/platforms.component';
import { UserRegisterComponent } from './screens/user/user-register/user-register.component';
import { UserLoginComponent } from './screens/user/user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { RegisterLibsAndFrameworksComponent } from './screens/libs-and-frameworks/register-libs-and-frameworks/register-libs-and-frameworks.component';
import { ListLibsAndFrameworksComponent } from './screens/libs-and-frameworks/list-libs-and-frameworks/list-libs-and-frameworks.component';
import { ListLessonsComponent } from './screens/lessons/list-lessons/list-lessons.component';
import { LessonComponent } from './screens/lessons/lesson/lesson.component';
import { RegisterPlatformComponent } from './screens/platforms/register-platform/register-platform.component';
import { FavoritesComponent } from './screens/favorites/favorites.component';
import { EditLessonComponent } from './screens/lessons/edit-lesson/edit-lesson.component';
import { EditPlatformComponent } from './screens/platforms/edit-platform/edit-platform.component';
import { EditLibAndFrameworkComponent } from './screens/libs-and-frameworks/edit-lib-and-framework/edit-lib-and-framework.component';
import { UserInfoComponent } from './screens/user/user-info/user-info.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'edit/user', component: UserInfoComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'register-libs-and-frameworks', component: RegisterLibsAndFrameworksComponent},
  {path: 'register-lesson', component: RegisterLessonsComponent},
  {path: 'platforms', component: PlatformsComponent},
  {path: 'edit/platform/:id', component: EditPlatformComponent},
  {path: 'register-platform', component: RegisterPlatformComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'libs-and-frameworks/:id',component: ListLibsAndFrameworksComponent,},
  {path: 'edit/lib-and-framework/:id',component: EditLibAndFrameworkComponent,},
  {path: 'lessons/:id', component: ListLessonsComponent},
  {path: 'lesson/:id', component: LessonComponent},
  {path: 'edit/lesson/:id', component: EditLessonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
