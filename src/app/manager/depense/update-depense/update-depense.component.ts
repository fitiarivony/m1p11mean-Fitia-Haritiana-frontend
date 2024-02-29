import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Depense, ValidatorOperatorField } from 'src/app/model';
import { DepenseService } from 'src/app/services/depense.service';
import { DevDuetValidator } from 'src/app/validator';

@Component({
  selector: 'app-update-depense',
  templateUrl: './update-depense.component.html',
  styleUrls: ['./update-depense.component.css'],
  providers:[MessageService]
})
export class UpdateDepenseComponent {
  depense:Depense={
    _id:"",
    prix:0,
    motif:"",
    date_depense:new Date()
  }
  dureeMinutes:string="";
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }

  updateDepense(){
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
    if (validationErrors.length > 0) {
      this.messageService.add({severity: 'error', detail: validationErrors.join(', ')});
    }else{
      this.depenseService.updateDepense(this.depense).subscribe({
        next:valiny=>{
          this.router.navigate(['/depenses/list']);
        },
        error:err=>this.messageService.add({severity: 'error', detail:err.error})
      })
    }

  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      let id_service = params['id']; // Access the 'id' parameter from the URL
      this.depenseService.getDepenseById(id_service).subscribe({
        next:valiny=>{
          this.depense=valiny
        },
        error:err=>this.messageService.add({severity: 'error', detail:err.error})
      })
    });
    // this.serveService.getServiceById()
  }
  constructor(private depenseService:DepenseService,private route: ActivatedRoute,private router:Router,private messageService:MessageService) {

  }
}
