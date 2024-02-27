import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit{
  links: any = [];
  items: any = [];
  sidebarVisible:boolean = false;

  constructor(public authService:AuthService,private router:Router){}
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
      if (localStorage.getItem('manager')) {
        localStorage.removeItem('manager')
        this.router.navigate(['/login-manager']);
      }else if(localStorage.getItem('employe')){
        localStorage.removeItem('employe')
        this.router.navigate(['/']);
      }else if (localStorage.getItem('client')) {
        localStorage.removeItem('client')
        this.router.navigate(['/sign-in'])
      }



      },
      error:err=>{console.log(err)}
    })
  }

}
