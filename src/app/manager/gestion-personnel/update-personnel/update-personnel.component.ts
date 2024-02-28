import { Component, Input } from '@angular/core'
import { Location } from '@angular/common'
import { FormEmploye, Genre } from 'src/app/model'
import { EmpService } from 'src/app/services/emp.service'
import { GenreService } from 'src/app/services/genre.service'

import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.css']
})
export class UpdatePersonnelComponent {
  @Input() newEmp: FormEmploye = {
    identifiant: '',
    mdp: '',
    dateDeNaissance: '',
    nom: '',
    numeroCIN: '',
    prenom: '',
    genre: '',
    services:[],
    horaire: []
  }
  // @Input() changeEditing()=>{}
  _id: string | null = ''
  genres: Genre[] = []
  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private route: ActivatedRoute,
    private location: Location
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
  }
  onlyPositiveInteger(event: KeyboardEvent): void {
    const inputChar = event.key;

    const target = event.target as HTMLInputElement ;

    // Allow only digits and check if the resulting value is greater than 0
    if (!/^\d$/.test(inputChar) || (target && target.value && parseInt(target.value + inputChar, 10) <= 0)) {
      event.preventDefault();
    }
  }


  submit () {
    const data = this.newEmp
    this.empService.update(data, this._id!).subscribe({
      next: v => {
        console.log(v)
        // this.location.
      },
      error: v => {
        console.log(v)
      }
    })
  }
}
