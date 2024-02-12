import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  client: Client = {
    _id: '',
    nom_client: '',
    prenom_client: '',
    identifiant: '',
    mdp: '',
    numero: '',
  };
  constructor(private client_service: ClientService, private router: Router) {}
  loginClient() {
    this.client_service.loginClient(this.client).subscribe({
      next: (client:any) => {
        console.log(client);

        localStorage.setItem('token',client.token.token)
        localStorage.setItem('id',client.admin._id)
        // this.router.navigate(['/prise-rdv']);
      },
      error: (err) => console.log(err.error),
    });

  }
}
