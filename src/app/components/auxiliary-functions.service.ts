import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryFunctions {

  constructor() {}

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }
}
