import { EmpService } from 'src/app/service/emp.service';
import { Component } from '@angular/core'
import { FormEmploye, Genre } from 'src/app/model'
import { GenreService } from 'src/app/service/genre.service'

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css']
})
export class AddPersonnelComponent {
  newEmp: FormEmploye = {
    identifiant: '',
    mdp: '',
    dateDeNaissance: '',
    nom: '',
    numeroCIN: '',
    prenom: '',
    genre: ''
  }
  genres: Genre[] = []
  constructor (private genreService: GenreService, private empService: EmpService) {
    genreService.getAll().subscribe({
      next: v => {
        this.genres = v
      },
      error: err => {
        console.log(err)
      }
    })
  }
  submit () {
    const data = this.newEmp
    this.empService.inscription(data).subscribe(
        {
          next: v => {
            console.log(v)
          },
          error: v => {
            console.log(v)
          }
        }
      )
  }
}
