import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Service } from 'src/app/interfaces/service'
import { FormEmploye, Genre } from 'src/app/model'
import { EmpService } from 'src/app/services/emp.service'
import { GenreService } from 'src/app/services/genre.service'

@Component({
  selector: 'app-show-personnel',
  templateUrl: './show-personnel.component.html',
  styleUrls: ['./show-personnel.component.css'],
  providers:[MessageService]
})
export class ShowPersonnelComponent {
  @Input() newEmp: FormEmploye = {
    identifiant: '',
    mdp: '',
    dateDeNaissance: '',
    nom: '',
    numeroCIN: '',
    prenom: '',
    genre: '',
    services: [],
    horaire: []
  }
  _id: string | null = ''
  @Input() nomGenre: string = ''
  genres: Genre[] = []
  @Input() services: Service[] = []
  nomService: string[] = []
  jourDeLaSemaine: string[] = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.genreService.getAll().subscribe({
      next: v => {
        this.genres = v
      },
      error: err => {
        // console.log(err)
        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
    let serv = this.newEmp.services
    let serviceDispo: string[] = []
    serv.map(v => {
      this.services.map(s => {
        // console.log(s._id, v)

        if (s._id === v) {
          serviceDispo.push(s.nom_service)
        }
      })
    })
    this.nomService = serviceDispo
  }
  submit (  ) {
    const data = this.newEmp
    this.empService.update(data, this._id!).subscribe({
      next: v => {
        // console.log(v)
      },
      error: v => {
        // console.log(v)
        this.messageService.add({severity: 'error', detail:v.error})
      }
    })
  }
}
