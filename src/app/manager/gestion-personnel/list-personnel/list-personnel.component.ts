import { EmpService } from 'src/app/services/emp.service'
import { Component } from '@angular/core'
import { Employe } from 'src/app/model'

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.css']
})
export class ListPersonnelComponent {
  constructor (private empService: EmpService) {
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
}
