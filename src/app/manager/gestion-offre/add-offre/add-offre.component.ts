import { ClientService } from './../../../services/client.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Service } from 'src/app/interfaces/service'
import { ClientName, FormOffre } from 'src/app/model'
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service'
import { ServeService } from 'src/app/services/serve.service'

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent {
  constructor (
    private serveService: ServeService,
    private offreSpecialeService: OffreSpecialeService,
    private router: Router,
    private clientService: ClientService
  ) {}
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
    this.offreSpecialeService.post(this.formOffre).subscribe(data => {
      console.log(data)
      // this.router.navigate(['/offre/liste'])
    })
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
