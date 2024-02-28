import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css'],
  providers:[MessageService]
})
export class InscriptionClientComponent {
  client: Client = {
    _id: '',
    nom_client: '',
    prenom_client: '',
    identifiant: '',
    mdp: '',
    numero: '',
  };
  constructor(private client_service: ClientService, private router: Router, private messageService:MessageService) {}
  createClient() {
    this.client_service.createClient(this.client).subscribe({
      next: (client) => this.router.navigate(['/']),
      error: (err) =>{
        console.log(err.error);

        this.messageService.add({ severity: 'error',  detail: err.error });} ,
    });
  }
}
