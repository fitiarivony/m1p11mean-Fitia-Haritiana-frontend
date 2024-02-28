import { EmpService } from 'src/app/services/emp.service'
import { Component } from '@angular/core'
import { FormEmploye, Genre, ValidatorField } from 'src/app/model'
import { GenreService } from 'src/app/services/genre.service'
import { MessageService } from 'primeng/api'
import { DevDuetValidator } from 'src/app/validator'

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css'],
  providers: [MessageService]
})
export class AddPersonnelComponent {
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
  genres: Genre[] = []
  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private messageService: MessageService
  ) {
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
    const data: any = this.newEmp;
    const validator: ValidatorField[] = [
      { champ: 'identifiant', valeur: '', errorMessage: 'Identifiant requis.' },
      { champ: 'mdp', valeur: '', errorMessage: 'Mot de passe requis.' },
      { champ: 'dateDeNaissance', valeur: '', errorMessage: 'Date of Birth requis.' },
      { champ: 'nom', valeur: '', errorMessage: 'Nom requis.' },
      { champ: 'numeroCIN', valeur: '', errorMessage: 'Numero CIN requis.' },
      { champ: 'prenom', valeur: '', errorMessage: 'Prenom requis.' },
      { champ: 'genre', valeur: '', errorMessage: 'Genre requis.' },
    ];

    // Validate the data
    const validationErrors: string[] = DevDuetValidator.validateData(data, validator);

    // Check if there are validation errors
    if (validationErrors.length > 0) {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: validationErrors.join('\n')});
      // console.log(validationErrors);
    } else {
      console.log("Data is valid!");
      this.empService.inscription(data).subscribe({
        next: v => {
          console.log(v)
        },
        error: v => {
          console.log(v)
        }
      })
    }

  }
}
