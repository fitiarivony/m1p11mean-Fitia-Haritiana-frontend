import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from 'src/app/interfaces/manager';
import { AuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent {
  constructor(private managerService: ManagerService,private router: Router,private authService:AuthService) {}
  manager:Manager={
    identifiant:"fitia",
    mdp:"fitia123",
    _id:"",
    nom:"",
  }

     onSubmit(){
      let val:Manager  ={
        identifiant:"",
        mdp:"",
        _id:"",
        nom:"",
      }
      this.managerService.login(this.manager).subscribe({
        next:manager=>{
          localStorage.setItem('token',manager.token.token);
          localStorage.setItem('manager','1')

          this.authService.isLoggedIn=true;
          this.authService.links=this.authService.managersLink;
          this.router.navigate(['/services/list']);
      },error :err =>{
        console.log(err.error);
      }
    });








    }
}
