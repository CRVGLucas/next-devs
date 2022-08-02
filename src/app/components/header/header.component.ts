import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/screens/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  hideRegister: boolean = true;
  constructor(private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
    this.init()
  }

  async init(){
    this.hideRegister = await this.userService.checkUserIsAdmin()

  }

  logout(){
    localStorage.removeItem('next_devs@user')
    this.hideRegister = false
    this.router.navigate(['/login'])
  }

}
