import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { ToastrComponent } from './toastr/toastr.component';
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    ToastrComponent,
    LoaderComponent,
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    ToastrComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxLoadingModule.forRoot({}),
  ]
})
export class SharedModule { }
