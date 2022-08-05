import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public showUserLoggedOptions: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {

   }

   updateResultList(isLogged: boolean) {
    this.showUserLoggedOptions.next(isLogged);
  }
}
