import { EmpService } from 'src/app/services/emp.service'
import { Component } from '@angular/core'
import { FormEmploye, Genre, ValidatorField } from 'src/app/model'
import { GenreService } from 'src/app/services/genre.service'
import { MessageService } from 'primeng/api'
import { DevDuetValidator } from 'src/app/validator'
import { Router } from '@angular/router'

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
  onlyPositiveInteger(event: KeyboardEvent): void {
    const inputChar = event.key;

    const target = event.target as HTMLInputElement ;

    // Allow only digits and check if the resulting value is greater than 0
    if (!/^\d$/.test(inputChar) || (target && target.value && parseInt(target.value + inputChar, 10) <= 0)) {
      event.preventDefault();
    }
  }

  genres: Genre[] = []
  constructor (
    private genreService: GenreService,
    private empService: EmpService,
    private messageService: MessageService,
    private router:Router
  ) {
    genreService.getAll().subscribe({
      next: v => {
        this.genres = v
      },
      error: err => {
        this.messageService.add({severity: 'error', detail:err.error})
      }
    })
  }
  submit () {
    const data: any = this.newEmp;
    const validator: ValidatorField[] = [
      { champ: 'identifiant', valeur: '', errorMessage: 'Identifiant requis.' },
      { champ: 'mdp', valeur: '', errorMessage: 'Mot de passe requis.' },
      { champ: 'dateDeNaissance', valeur: '', errorMessage: 'Date de naissance requis.' },
      { champ: 'nom', valeur: '', errorMessage: 'Nom requis.' },
      { champ: 'numeroCIN', valeur: '', errorMessage: 'Numero CIN requis.' },
      { champ: 'prenom', valeur: '', errorMessage: 'Prenom requis.' },
      { champ: 'genre', valeur: '', errorMessage: 'Genre requis.' },
    ];

    // Validate the data
    const validationErrors: string[] = DevDuetValidator.validateData(data, validator);
   let today=new Date().getFullYear()
    if(today-new Date(data.dateDeNaissance).getFullYear() <=18)validationErrors.push("L'employé doit être majeur");
    // Check if there are validation errors
    if (validationErrors.length > 0) {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: validationErrors.join('\n')});
      // console.log(validationErrors);
    } else {
      // console.log("Data is valid!");
      this.empService.inscription(data).subscribe({
        next: v => {
          // console.log(v)
          this.router.navigate(['/emps'])
        },
        error: v => {
          this.messageService.add({severity: 'error', detail:v.error})
        }
      })
    }

  }
}
