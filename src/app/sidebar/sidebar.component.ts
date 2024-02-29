import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[MessageService]
})
export class SidebarComponent implements OnInit{
  links: any = [];
  items: any = [];
  sidebarVisible:boolean = false;

  constructor(public authService:AuthService,private router:Router,private messageService:MessageService){}
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
      next:valiny=>{
      this.authService.isLoggedIn=false
      this.authService.links=[]
      localStorage.removeItem("id")
      localStorage.removeItem('token')
      localStorage.removeItem('manager')
      localStorage.removeItem('employe')
      localStorage.removeItem('client')
      this.router.navigate(['/'])
      },

      error:err=>{

        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
  }

}
