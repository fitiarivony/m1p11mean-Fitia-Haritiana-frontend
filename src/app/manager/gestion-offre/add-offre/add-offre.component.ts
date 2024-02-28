import { ClientService } from './../../../services/client.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageService } from 'primeng/api'
import { Service } from 'src/app/interfaces/service'
import { ClientName, FormOffre, ValidatorOperatorField } from 'src/app/model'
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service'
import { ServeService } from 'src/app/services/serve.service'
import { DevDuetValidator } from 'src/app/validator'

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css'],
  providers:[MessageService]
})
export class AddOffreComponent {
  constructor (
    private serveService: ServeService,
    private offreSpecialeService: OffreSpecialeService,
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService
  ) {}
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }

  services: Service[] = []
  nomClients: ClientName[] = []
  formOffre: FormOffre = {
    nomOffreSpeciale: '',
    description: '',
    service: '',
    reduction: 0,
    dateDebut: '',
    dateFin: '',
    nombre: 1,
    clientVises:[]
  }
  title = 'angular'
  public Editor = ClassicEditor
  ngOnInit (): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.serveService.listService().subscribe(data => {
      this.services = data
    })
    this.clientService.getNames().subscribe(data => {
      this.nomClients = data
    })

  }
  submit () {
    const validator:ValidatorOperatorField[]=[
      {
        champ:'nomOffreSpeciale',valeur:'',errorMessage:"Le nom de l'offre est obligatoire",operator:'='
      },
      {
        champ:'description',valeur:'',errorMessage:"La description de l'offre est obligatoire",operator:"="
      },
      {
        champ:'service',valeur:'',errorMessage:"La service de l'offre est obligatoire",operator:"="
      },
      {
        champ:'dateDebut',valeur:'',errorMessage:"La date de début de l'offre est obligatoire",operator:"="
      },
      {
        champ:'dateFin',valeur:'',errorMessage:"La date de fin de l'offre est obligatoire",operator:"="
      },
      {
        champ:'reduction',valeur:0,errorMessage:"La réduction doit être supérieur à 0",operator:">"
      },
      {
        champ:'reduction',valeur:100,errorMessage:"La réduction doit être inférieur à 100",operator:"<"
      },
      {
        champ:'nombre',valeur:0,errorMessage:"Le nombre d'utilisation doit être supérieur à 0",operator:">"
      },
      {
        champ:'clientVises',valeur:0,errorMessage:"Les clients visés l'offre est obligatoire",operator:"array"
      },
    ]
    let data:any=this.formOffre
    const validationErrors: string[] = DevDuetValidator.validateAdvanceData(data, validator);
    if (validationErrors.length > 0 ) {
      this.messageService.add({severity: 'error', detail: validationErrors.join(',')})
    }else{
      this.offreSpecialeService.post(this.formOffre).subscribe(data => {
        console.log(data)
        // this.router.navigate(['/offre/liste'])
      })
    }

  }
  add (id: string) {
    let temp = [...this.formOffre.clientVises!]
    temp = temp.filter(v => v !== id)
    console.log(temp)
    if (this.formOffre.clientVises!.length === temp.length) {
      temp.push(id)
    }
    let tempEmp=this.formOffre
    tempEmp.clientVises=temp
    this.formOffre=tempEmp
  }

}
