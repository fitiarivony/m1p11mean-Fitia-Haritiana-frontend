import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DevDuetValidator } from 'src/app/validator';
import { ValidatorOperatorField } from 'src/app/model';

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
  onlyPositiveInteger(event: KeyboardEvent): void {
    const inputChar = event.key;

    const target = event.target as HTMLInputElement ;

    // Allow only digits and check if the resulting value is greater than 0
    if (!/^\d$/.test(inputChar) || (target && target.value && parseInt(target.value + inputChar, 10) <= 0)) {
      event.preventDefault();
    }
  }

  constructor(private client_service: ClientService, private router: Router, private messageService:MessageService) {}
  createClient() {
    const validator:ValidatorOperatorField[]=[
      {
        champ:'nom_client',valeur:'',errorMessage:'Le nom du client est obligatoire',operator:'='
      },
      {
        champ:'prenom_client',valeur:"",errorMessage:'Le prénom du client est obligatoire',operator:"="
      },
      {
        champ:'identifiant',valeur:"",errorMessage:"L'identifiant du client est obligatoire",operator:"="
      },
      {
        champ:'mdp',valeur:"",errorMessage:'Le mot de passe du client est obligatoire',operator:"="
      },
      {
        champ:'numero',valeur:"",errorMessage:'Le numéro du client est obligatoire',operator:"="
      },

    ]
    let data:any=this.client
    const validationErrors: string[] = DevDuetValidator.validateAdvanceData(data, validator);
    if (validationErrors.length > 0) {
      this.messageService.add({severity: "error",detail:validationErrors.join(",")})
    }
  else{  this.client_service.createClient(this.client).subscribe({
      next: (client) => this.router.navigate(['/']),
      error: (err) =>{
        // console.log(err.error);

        this.messageService.add({ severity: 'error',  detail: err.error });} ,
    });}
  }
}
