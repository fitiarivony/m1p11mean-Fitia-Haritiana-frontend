import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from 'src/app/interfaces/manager';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent {
  constructor(private managerService: ManagerService,private router: Router) {}
  manager:Manager={
    identifiant:"",
    mdp:"",
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
          this.router.navigate(['/services/list']);
      },error :err =>{
        console.log(err.message);
      }
    });








    }
}
