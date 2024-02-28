import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServeService } from '../../services/serve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidatorField, ValidatorOperatorField } from 'src/app/model';
import { DevDuetValidator } from 'src/app/validator';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css'],
  providers:[MessageService]
})
export class UpdateServiceComponent {
  service:Service={
    _id:"",
    nom_service:"",
    prix:0,
    duree:0,
    comission:0,
  }
  dureeMinutes:string="";
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }
  updateService(){
    let service={...this.service}
    let duree=this.dureeMinutes;
   let sep=duree.split(':');
    let minutes=parseInt(sep[0])*60+parseInt(sep[1]);
    service.duree=minutes;
  console.log(service);
  const validator:ValidatorOperatorField[]=[
    {
      champ:'nom_service',valeur:'',errorMessage:'Le nom du service est obligatoire',operator:'='
    },
    {
      champ:'prix',valeur:0,errorMessage:'Le prix du service est obligatoire',operator:">"
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
  let data:any=service
  const validationErrors: string[] = DevDuetValidator.validateAdvanceData(data, validator);
  if (validationErrors.length > 0) {
    this.messageService.add({severity:'error', detail: validationErrors.join(',')});
  }else{
    this.serveService.updateService(service).subscribe({
      next:valiny=>{
        this.router.navigate(['/services/list']);
      },
      error:err=>console.log(err.error)
    })
  }
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      let id_service = params['id']; // Access the 'id' parameter from the URL
      this.serveService.getServiceById(id_service).subscribe({
        next:valiny=>{
          this.service=valiny
          this.dureeMinutes=this.parseHour(valiny.duree);
        },
        error:err=>console.log(err.error)
      })
    });
    // this.serveService.getServiceById()
  }
  constructor(private serveService:ServeService,private route: ActivatedRoute,private router:Router,private messageService:MessageService) {

  }
  parseHour(diffMs:number){
    let tempsTravail:string="";
    if (diffMs >= 60) {
      const heures = Math.floor(diffMs / 60) // Calculer les heures
      const minutes = Math.round((diffMs % 60))
      let stringmin= ('0'+minutes).slice(-2)
      let stringhour= ('0'+heures).slice(-2)
      tempsTravail = `${stringhour}:${stringmin}`
    } else {
      let stringmin= ('0'+diffMs).slice(-2)
      tempsTravail = `00:${stringmin}`
    }
    return tempsTravail;
  }
}
