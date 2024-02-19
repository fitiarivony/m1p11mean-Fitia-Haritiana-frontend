import { Component } from '@angular/core'
import { Login } from 'src/app/model'
import { LoginEmpService } from '../login-emp.service'
import { EmpService } from 'src/app/services/emp.service'
@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css']
})
export class LoginEmpComponent {
  constructor (private dataService: EmpService) {}
  login: Login = {
    identifiant: '',
    mdp: ''
  }
  log () {
    const data = this.login
    let log = this.dataService.postData(data)
    console.log(log)

    this.dataService.postData(data).subscribe(
      {
        next: v => {
          localStorage.setItem('token',v.token.token)
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
