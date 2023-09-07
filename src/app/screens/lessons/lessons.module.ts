import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson/lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { ListLessonsComponent } from './list-lessons/list-lessons.component';
import { RegisterLessonsComponent } from './register-lessons/register-lessons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    LessonComponent,
    EditLessonComponent,
    ListLessonsComponent,
    RegisterLessonsComponent,
  ],
  exports: [
    LessonComponent,
    EditLessonComponent,
    ListLessonsComponent,
    RegisterLessonsComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    AngularEditorModule,
    ReactiveFormsModule
  ]
})
export class LessonsModule { }
