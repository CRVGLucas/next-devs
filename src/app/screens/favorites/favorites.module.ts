import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  exports: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class FavoritesModule { }
