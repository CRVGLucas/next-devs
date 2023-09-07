import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformsComponent } from './platforms.component';
import { EditPlatformComponent } from './edit-platform/edit-platform.component';
import { RegisterPlatformComponent } from './register-platform/register-platform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    PlatformsComponent,
    EditPlatformComponent,
    RegisterPlatformComponent,
  ],
  exports: [
    PlatformsComponent,
    EditPlatformComponent,
    RegisterPlatformComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PlatformsModule { }
