import { EmpService } from 'src/app/services/emp.service'
import { Component } from '@angular/core'
import { Employe } from 'src/app/model'
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class ListPersonnelComponent {
  constructor (private empService: EmpService,private confirmationService: ConfirmationService,private messageService: MessageService) {
    this.getList()
  }
  listPersonnel: Employe[] = []
  delete (id: string) {
    this.empService.delete(id).subscribe({
      next: v => {
        console.log(v)
        this.getList()
      },
      error: err => {
        console.log(err)
      }
    })
  }
  getList () {
    this.empService.getAll().subscribe({
      next: v => {
        v.map((el: Employe) => {
          el.dateDeNaissance = new Date(el.dateDeNaissance)
        })
        this.listPersonnel = v
      },
      error: err => {
        console.log(err)
      }
    })
  }
  confirm(event: any,_id:string) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Êtes-vous sûre de supprimer cet employe?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        acceptButtonStyleClass:"p-button-success",
        rejectButtonStyleClass:"p-button-danger",
        accept: () => {
          this.delete(_id);
            this.messageService.add({ severity: 'info', detail: 'Vous avez supprimé cet employe' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error',  detail: 'La suppression de cet employe a été annulé' });
        }
    });
}
}
