import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Depense, ValidatorOperatorField } from 'src/app/model';
import { DepenseService } from 'src/app/services/depense.service';
import { DevDuetValidator } from '../../../validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-depense',
  templateUrl: './create-depense.component.html',
  styleUrls: ['./create-depense.component.css'],
  providers:[MessageService]
})
export class CreateDepenseComponent {
  depense:Depense={
    _id:"",
    date_depense:new Date(),
    prix:0,
    motif:""
  }
  dureeMinutes:number = 0
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }

  createDepense(){
    const validator:ValidatorOperatorField[]=[
      {
        champ:'motif',valeur:'',errorMessage:'Le motif est obligatoire',operator:'='
      },
      {
        champ:'date_depense',valeur:'',errorMessage:'La date de dépense est obligatoire',operator:">"
      },
      {
        champ:'prix',valeur:0,errorMessage:'La prix de dépense doit être supérieur à 0',operator:">"
      },
    ]
    let data:any=this.depense
    const validationErrors: string[] = DevDuetValidator.validateAdvanceData(data, validator);
    if(validationErrors.length>0){
      this.messageService.add({severity: 'error', detail: validationErrors.join(', ')});
    }else{
      this.depense_service.createDepense(this.depense).subscribe(
        {
          next:depense=>{
            this.router.navigate(['/depenses/list'])
          },error:err=>{
            console.log(err.message);
          }
        }
      )
    }

  }
  constructor(private depense_service:DepenseService,private router:Router,private messageService:MessageService){}
}
