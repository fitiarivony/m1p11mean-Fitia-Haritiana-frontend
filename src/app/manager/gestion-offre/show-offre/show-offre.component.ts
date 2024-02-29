import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageService } from 'primeng/api'
import { Service } from 'src/app/interfaces/service'
import { FormOffre, ValidatorOperatorField } from 'src/app/model'
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service'
import { ServeService } from 'src/app/services/serve.service'
import { DevDuetValidator } from 'src/app/validator'

@Component({
  selector: 'app-show-offre',
  templateUrl: './show-offre.component.html',
  styleUrls: ['./show-offre.component.css'],
  providers: [MessageService]
})
export class ShowOffreComponent {
  constructor (
    private serveService: ServeService,
    private offreSpecialeService: OffreSpecialeService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  services: Service[] = []
  formOffre: FormOffre = {
    nomOffreSpeciale: '',
    description: '',
    service: '',
    reduction: 0,
    dateDebut: '',
    dateFin: '',
    nombre: 0
  }
  _id: string = ''
  editing: boolean = false
  title = 'angular'
  public Editor = ClassicEditor
  onlyNumber(event: KeyboardEvent): void {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }
  ngOnInit (): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.serveService.listService().subscribe(data => {
      this.services = data
    })
    this.route.params.subscribe(params => {
      this._id = params['id']
    })
    this.offreSpecialeService.getOne(this._id).subscribe(data => {
      // console.log(data)

      this.formOffre = data
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
        champ:'reduction',valeur:0,errorMessage:"Le nombre d'utilisation doit être supérieur à 0",operator:">"
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
    if (validationErrors.length > 0) {
        this.messageService.add({severity: "error", detail: validationErrors.join(", ")});
    }else{
      let forme:any={...this.formOffre}
      forme.dateDebut=new Date(forme.dateDebut)
      forme.dateFin=new Date(forme.dateFin)
      this.offreSpecialeService
      .update(forme, this._id)
      .subscribe(data => {
        // console.log(data)
        this.changeEditingStatus()
      })
    }

  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDateTimeForInput(date: string) {
    if (date === undefined) return '';
    const dt = new Date(date);
    return (
      [
        dt.getFullYear(),
        this.padTo2Digits(dt.getMonth() + 1),
        this.padTo2Digits(dt.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(dt.getHours()),
        this.padTo2Digits(dt.getMinutes()),
      ].join(':')
    );
  }

  changeEditingStatus () {
    this.offreSpecialeService.getOne(this._id).subscribe(data => {
      this.formOffre = data
      this.formOffre.dateDebut=this.formatDateTimeForInput(this.formOffre.dateDebut)
      this.formOffre.dateFin=this.formatDateTimeForInput(this.formOffre.dateFin)
    })
    this.editing = !this.editing
  }
}
