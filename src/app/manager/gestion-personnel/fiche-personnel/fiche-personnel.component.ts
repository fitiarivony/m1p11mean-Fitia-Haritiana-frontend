import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormEmploye, Genre, Horaire, ValidatorField } from 'src/app/model'
import { EmpService } from 'src/app/services/emp.service'
import { GenreService } from 'src/app/services/genre.service'
import { Injectable } from '@angular/core'
import { ServeService } from 'src/app/services/serve.service'
import { Service } from 'src/app/interfaces/service'
import { DevDuetValidator } from 'src/app/validator'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-fiche-personnel',
  templateUrl: './fiche-personnel.component.html',
  styleUrls: ['./fiche-personnel.component.css'],
  providers:[MessageService]
})
export class FichePersonnelComponent {
  editing: boolean = false
  _id: string | null = ''
  genres: Genre[] = []
  newEmp: FormEmploye = {
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
  services: Service[] = []
  nomGenre: string = ''
  formHoraire:Horaire={debut:new Date(), fin:new Date(), jour:0}
  jourDeLaSemaine: string[] = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private route: ActivatedRoute,
    private serveService: ServeService,
    private messageService: MessageService
  ) {}
  ngOnInit () {
    // Call a function to get the URL parameter on component initialization
    this.serveService.listService().subscribe({
      next: v => {
        this.services = v
      },
      error: err => {
        console.log(err)
      }
    })
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
  submit () {
    const data = this.newEmp
    const validator: ValidatorField[] = [
      { champ: 'identifiant', valeur: '', errorMessage: 'Identifiant requis.' },
      { champ: 'mdp', valeur: '', errorMessage: 'Mot de passe requis.' },
      { champ: 'dateDeNaissance', valeur: '', errorMessage: 'Date of Birth requis.' },
      { champ: 'nom', valeur: '', errorMessage: 'Nom requis.' },
      { champ: 'numeroCIN', valeur: '', errorMessage: 'Numero CIN requis.' },
      { champ: 'prenom', valeur: '', errorMessage: 'Prenom requis.' },
      { champ: 'genre', valeur: '', errorMessage: 'Genre requis.' }
    ];

    // Validate the data
    const validationErrors: string[] = DevDuetValidator.validateData(data, validator);

    // Check if there are validation errors
    if (validationErrors.length > 0) {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: validationErrors.join('\n')});
      // console.log(validationErrors);
    } else {
      console.log("Data is valid!");
      this.empService.update(data, this._id!).subscribe({
        next: v => {
          this.newEmp=v
          this.genres.map((g: Genre) => {
            if (g._id === this.newEmp.genre) {
              console.log(g.nomGenre)
              this.nomGenre = g.nomGenre
            }
          })
          // this.location.
          this.editing = false
        },
        error: v => {
          console.log(v)
        }
      })
    }

  }
  getToUpdate () {
    // Retrieve the URL parameter using the ActivatedRoute service
    this._id = this.route.snapshot.paramMap.get('id')
    this.empService.getOne(this._id!).subscribe({
      next: v => {
        v.dateDeNaissance = new Date(v.dateDeNaissance)
          .toISOString()
          .split('T')[0]
        this.newEmp = v
        this.genres.map((g: Genre) => {
          if (g._id === this.newEmp.genre) {
            console.log(g.nomGenre)
            this.nomGenre = g.nomGenre
          }
        })
      },
      error: err => {
        console.log(err)
      }
    })
  }
  changeEditing () {
    this.editing = !this.editing
  }
  add (id: string) {
    let temp = this.newEmp.services
    temp = temp.filter(v => v !== id)
    console.log(temp)
    if (this.newEmp.services.length === temp.length) {
      temp.push(id)
    }
    let tempEmp=this.newEmp
    tempEmp.services=temp
    this.newEmp=tempEmp
  }
  addHoraire(){
    this.newEmp.horaire.push(this.formHoraire)
  }
  delete(horaire:Horaire){
    let temp=this.newEmp.horaire
    this.newEmp.horaire=temp.filter(v=>v!==horaire)
  }
}
