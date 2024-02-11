import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { EmployeName } from 'src/app/model';
import { EmpService } from 'src/app/services/emp.service';
import { ServeService } from 'src/app/services/serve.service';

@Component({
  selector: 'app-gestion-preference-services',
  templateUrl: './gestion-preference-services.component.html',
  styleUrls: ['./gestion-preference-services.component.css']
})
export class GestionPreferenceServicesComponent {
  employeName: Service[] = []
  editing: boolean = true
  idPersonne: string = ''
  favoriteEmp: string[] = []
  constructor (private serveService: ServeService) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.serveService.listService().subscribe({
      next: v => {
        this.employeName = v
      },
      error: err => {
        console.log(err)
      }
    })
    // this.serveService.getFavEmp().subscribe({
    //   next: v => {
    //     this.favoriteEmp = v
    //   },
    //   error: err => {
    //     console.log(err)
    //   }
    // })
  }
  add () {
    let id = this.idPersonne
    if (!this.favoriteEmp.includes(id)) this.favoriteEmp.push(id)
  }
  delete (id: string) {
    this.favoriteEmp=this.favoriteEmp.filter(e => e !== id)
  }
}
