import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/interfaces/client';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css'],
  providers:[MessageService]
})
export class LoginClientComponent {
  client: Client = {
    _id: '',
    nom_client: '',
    prenom_client: '',
    identifiant: 'jean@gmail.com',
    mdp: 'jean',
    numero: '',
  };
  constructor(private client_service: ClientService, private router: Router,private authService:AuthService,private messageService:MessageService) {}
  loginClient() {
    this.client_service.loginClient(this.client).subscribe({
      next: (client:any) => {
        // console.log(client);
        this.authService.isLoggedIn=true;
        this.authService.links=this.authService.clientLinks;
        localStorage.setItem('client','1')
        localStorage.setItem('token',client.token.token)
        localStorage.setItem('id',client.admin._id)
        this.router.navigate(['/client/histo']);
      },
      error: (err) =>{
        this.messageService.add({ severity: 'error',  detail: err.error });
      },
    });

  }
}
