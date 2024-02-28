import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServeService } from '../../services/serve.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidatorField, ValidatorOperatorField } from 'src/app/model';
import { DevDuetValidator } from 'src/app/validator';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
  providers:[MessageService]
})
export class CreateServiceComponent {
  service:Service={
    _id:"",
    nom_service:"",
    prix:0,
    duree:0,
    comission:0,
  }
  dureeMinutes:number = 0
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }

  createService(){
    const validator:ValidatorOperatorField[]=[
      {
        champ:'nom_service',valeur:'',errorMessage:'Le nom du service est obligatoire',operator:'='
      },
      {
        champ:'prix',valeur:0,errorMessage:'Le prix du service doit être supérieur à 0',operator:">"
      },
      {
        champ:'duree',valeur:0,errorMessage:'La durée du service doit être supérieur à 0',operator:">"
      },
      {
        champ:'comission',valeur:0,errorMessage:'La commission du service doit être supérieur à 0',operator:">"
      },
      {
        champ:'comission',valeur:100,errorMessage:'La commission du service doit être inférieur à 100',operator:"<"
      },

    ]
    let data:any=this.service
    const validationErrors: string[] = DevDuetValidator.validateAdvanceData(data, validator);

    if (validationErrors.length > 0) {
      this.messageService.add({severity:'error', detail: validationErrors.join(',')});
    }else{
      let duree=this.service.duree.toString();
      let sep=duree.split(':');
       let minutes=parseInt(sep[0])*60+parseInt(sep[1]);
       let service={...this.service};
       service.duree=minutes;
         this.serve_service.createService(service).subscribe(
           {
             next:service=>{
               this.router.navigate(['/services/list'])
             },error:err=>{
               console.log(err.message);
             }
           }
         )
    }

  }
  constructor(private serve_service:ServeService,private router:Router,private messageService:MessageService){}
}
