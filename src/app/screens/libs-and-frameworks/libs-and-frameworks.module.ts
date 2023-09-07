import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLibAndFrameworkComponent } from './edit-lib-and-framework/edit-lib-and-framework.component';
import { ListLibsAndFrameworksComponent } from './list-libs-and-frameworks/list-libs-and-frameworks.component';
import { RegisterLibsAndFrameworksComponent } from './register-libs-and-frameworks/register-libs-and-frameworks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EditLibAndFrameworkComponent,
    ListLibsAndFrameworksComponent,
    RegisterLibsAndFrameworksComponent,
  ],
  exports: [
    EditLibAndFrameworkComponent,
    ListLibsAndFrameworksComponent,
    RegisterLibsAndFrameworksComponent,
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
export class LibsAndFrameworksModule { }
