import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Service } from 'src/app/interfaces/service'
import { FormOffre } from 'src/app/model'
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service'
import { ServeService } from 'src/app/services/serve.service'

@Component({
  selector: 'app-show-offre',
  templateUrl: './show-offre.component.html',
  styleUrls: ['./show-offre.component.css']
})
export class ShowOffreComponent {
  constructor (
    private serveService: ServeService,
    private offreSpecialeService: OffreSpecialeService,
    private route: ActivatedRoute
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
      console.log(data)

      this.formOffre = data
    })
  }
  submit () {
    this.offreSpecialeService
      .update(this.formOffre, this._id)
      .subscribe(data => {
        console.log(data)
        this.changeEditingStatus()
      })
  }
  changeEditingStatus () {
    this.editing = !this.editing
  }
}
