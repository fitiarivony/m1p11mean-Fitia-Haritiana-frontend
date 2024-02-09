import { Component } from '@angular/core'
import { FormEmploye, Genre } from 'src/app/model'
import { EmpService } from 'src/app/service/emp.service'
import { GenreService } from 'src/app/service/genre.service'

import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.css']
})
export class UpdatePersonnelComponent {
  newEmp: FormEmploye = {
    identifiant: '',
    mdp: '',
    dateDeNaissance: '',
    nom: '',
    numeroCIN: '',
    prenom: '',
    genre: ''
  }
  _id: string | null = ''
  genres: Genre[] = []
  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private route: ActivatedRoute
  ) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.genreService.getAll().subscribe({
      next: v => {
        this.genres = v
      },
      error: err => {
        console.log(err)
      }
    })
    this.getToUpdate()
  }

  getToUpdate () {
    // Retrieve the URL parameter using the ActivatedRoute service
    this._id = this.route.snapshot.paramMap.get('id')
    this.empService.getOne(this._id!).subscribe({
      next:v=>{
        v.dateDeNaissance = new Date(v.dateDeNaissance).toISOString().split('T')[0]
        this.newEmp = v
      },
      error:err=>{
        console.log(err);

      }
    })
  }
  submit () {
    const data = this.newEmp
    this.empService.update(data, this._id!).subscribe({
      next: v => {
        console.log(v)
      },
      error: v => {
        console.log(v)
      }
    })
  }
}
