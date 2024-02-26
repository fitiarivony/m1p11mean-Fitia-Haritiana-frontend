import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit{
  links: any = [];
  items: any = [];
  sidebarVisible:boolean = false;

  constructor(public authService:AuthService){}
  ngOnInit(): void {
    if (localStorage.getItem('client')) {
      this.authService.isLoggedIn=true;
      this.authService.links=this.authService.clientLinks
    }else if (localStorage.getItem('employe')) {
      this.authService.isLoggedIn=true;
      this.authService.links=this.authService.employeLinks
    }else if (localStorage.getItem('manager')) {
      this.authService.isLoggedIn=true;
      this.authService.links=this.authService.managersLink
    }

  }
  logout(){
    this.authService.logout().subscribe({
      next:valiny=>{console.log("Nety");
      this.authService.isLoggedIn=false
      this.authService.links=[]
      localStorage.removeItem("id")
      localStorage.removeItem('token')
      localStorage.removeItem('manager')
      localStorage.removeItem('employe')
      localStorage.removeItem('client')
      },
      error:err=>{console.log(err)}
    })
  }

}
