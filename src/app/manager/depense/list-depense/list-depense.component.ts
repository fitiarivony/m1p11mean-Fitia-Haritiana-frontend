import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Depense } from 'src/app/model';
import { DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.css'],
  providers:[ ConfirmationService,MessageService]
})
export class ListDepenseComponent {
  depenses:Depense[]|[]=[]
  constructor(private depenseService:DepenseService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(){
    this.depenseService.listDepense().subscribe({
      next:depenses=>{
        this.depenses=depenses;
      },error :err =>{
        console.log(err.message);
      }
    })
  }
  deleteService(_id:string){
    this.depenseService.deleteDepense(_id).subscribe({
      next:code=>{
        this.depenses=this.depenses.filter(service=>service._id!=_id)
      },
      error:err=>console.log(err.message)
    });

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
