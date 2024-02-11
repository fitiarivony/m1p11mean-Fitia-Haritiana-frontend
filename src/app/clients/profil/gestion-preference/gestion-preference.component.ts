import { Component } from '@angular/core'
import { EmployeName } from 'src/app/model'
import { EmpService } from 'src/app/services/emp.service'

@Component({
  selector: 'app-gestion-preference',
  templateUrl: './gestion-preference.component.html',
  styleUrls: ['./gestion-preference.component.css']
})
export class GestionPreferenceComponent {
  employeName: EmployeName[] = []
  editing: boolean = true
  idPersonne: string = ''
  favoriteEmp: string[] = []
  constructor (private empservice: EmpService) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.empservice.getAllNames().subscribe({
      next: v => {
        this.employeName = v
      },
      error: err => {
        console.log(err)
      }
    })
    this.empservice.getFavEmp().subscribe({
      next: v => {
        this.favoriteEmp = v
      },
      error: err => {
        console.log(err)
      }
    })
  }
  add () {
    let id = this.idPersonne
    if (!this.favoriteEmp.includes(id)) this.favoriteEmp.push(id)
  }
  delete (id: string) {
    this.favoriteEmp=this.favoriteEmp.filter(e => e !== id)
  }
}
