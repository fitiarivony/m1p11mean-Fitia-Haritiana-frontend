import { Component } from '@angular/core';
import { ServeService } from '../../services/serve.service';
import { Service } from 'src/app/interfaces/service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css'],
  providers:[ ConfirmationService,MessageService]
})
export class ListServiceComponent {
  services:Service[]|[]=[]
  constructor(private serveService:ServeService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(){
    this.serveService.listService().subscribe({
      next:services=>{
        this.services=services;
      },error :err =>{
        console.log(err.message);
      }
    })
  }
  deleteService(_id:string){
    this.serveService.deleteService(_id).subscribe({
      next:code=>{
        this.services=this.services.filter(service=>service._id!=_id)
      },
      error:err=>console.log(err.message)
    });

  }
  parseHour(diffMs:number){
    let tempsTravail:string="";
    if (diffMs >= 60) {
      const heures = Math.floor(diffMs / 60) // Calculer les heures
      const minutes = Math.round((diffMs % 60))
      let stringmin= ('0'+minutes).slice(-2)
      let stringhour= ('0'+heures).slice(-2)
      tempsTravail = `${stringhour} : ${stringmin} `
    } else {
      let stringmin= ('0'+diffMs).slice(-2)
      tempsTravail = `00:${stringmin}`
    }
    return tempsTravail;
  }
  confirm(event: any,_id:string) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Êtes-vous sûre de supprimer ce service?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        acceptButtonStyleClass:"p-button-success",
        rejectButtonStyleClass:"p-button-danger",
        accept: () => {
          this.deleteService(_id);
            this.messageService.add({ severity: 'info', detail: 'Vous avez supprimé ce service' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error',  detail: 'La suppression de ce service a été annulé' });
        }
    });
}
}
