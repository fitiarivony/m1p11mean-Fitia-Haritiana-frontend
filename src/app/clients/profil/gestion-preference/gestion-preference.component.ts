import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { EmployeName } from 'src/app/model'
import { ClientService } from 'src/app/services/client.service'
import { EmpService } from 'src/app/services/emp.service'

@Component({
  selector: 'app-gestion-preference',
  templateUrl: './gestion-preference.component.html',
  styleUrls: ['./gestion-preference.component.css'],
  providers:[MessageService]
})
export class GestionPreferenceComponent {
  employeName: EmployeName[] = []
  editing: boolean = false
  idPersonne: string = ''
  favoriteEmp: string[] = []
  constructor (
    private clientService: ClientService,
    private empservice: EmpService,
    private messageService: MessageService
  ) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.empservice.getAllNames().subscribe({
      next: v => {
        this.employeName = v
      },
      error: err => {
        // console.log(err)
        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
    this.clientService.getFavEmp(localStorage.getItem('id')!).subscribe({
      next: v => {
        this.favoriteEmp = v
      },
      error: err => {
        // console.log(err)
        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
  }
  add () {
    let id = this.idPersonne
    if (!this.favoriteEmp.includes(id)) this.favoriteEmp.push(id)
  }
  delete (id: string) {
    this.favoriteEmp = this.favoriteEmp.filter(e => e !== id)
  }
  changeEditingStatus () {
    this.editing = !this.editing
  }
  submit () {
    this.clientService
      .setFavEmp(localStorage.getItem('id')!, this.favoriteEmp)
      .subscribe({
        next: v => {
          // console.log(v)
          this.changeEditingStatus()
        },
        error: err => {
          // console.log(err)
          this.messageService.add({severity: 'error', detail:err.error})
        }
      })
  }
}
