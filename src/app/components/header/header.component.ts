import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/screens/user/user.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  hideRegister: boolean = true;
  constructor(private userService: UserService, private router: Router, private headerService: HeaderService) { 
  }

  ngOnInit(): void {
    this.init()
  }

  async init(){
    this.headerService.updateResultList(await this.userService.checkUserIsLogged()) 
    
    this.hideRegister = await this.userService.checkUserIsAdmin()
    this.headerService.showUserLoggedOptions.subscribe(
      (result) => {
        this.hideRegister = result
      }
    )

  }

  logout(){
    localStorage.removeItem('next_devs@user')
    this.hideRegister = false
    this.headerService.updateResultList(false)
    this.router.navigate(['/login'])
  }

}
