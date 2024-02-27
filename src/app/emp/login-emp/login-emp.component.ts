import { Component } from '@angular/core'
import { Login } from 'src/app/model'
import { LoginEmpService } from '../login-emp.service'
import { EmpService } from 'src/app/services/emp.service'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css']
})
export class LoginEmpComponent {
  constructor (private dataService: EmpService,private router: Router,private authService:AuthService) {}
  login: Login = {
    identifiant: 'rabekoto@gmail.com',
    mdp: 'jean'
  }
  log () {
    const data = this.login
    let log = this.dataService.postData(data)
    console.log(log)

    this.dataService.postData(data).subscribe(
      {
        next: v => {
          localStorage.setItem('token',v.token.token)
          localStorage.setItem('id',v.admin._id);
          localStorage.setItem('employe','1')
          this.authService.isLoggedIn=true;
          this.authService.employeLinks=[
            {
              label: 'Afficher les rendez-vous',
              icon: 'pi pi-calendar',
              routerLink: ['/rdv/show'],
            },
            {
              label: 'Suivi des rendez-vous',
              icon: 'pi pi-calendar-times',
              routerLink: ['/emp/rdv/suivi'],
            },
            {
              label: 'Profil et horaire',
              icon: 'pi pi-user',
              routerLink: ['/emps/show/'+localStorage.getItem('id')],
            },
          ];
          this.authService.links=this.authService.employeLinks;
          this.router.navigate(['/emp/rdv/suivi']);
          console.log(v)
        },
        error: v => {
          console.log(v)
        }
      }
    )
  }
  onClick = () => {
    console.log(this.login)
  }
}
