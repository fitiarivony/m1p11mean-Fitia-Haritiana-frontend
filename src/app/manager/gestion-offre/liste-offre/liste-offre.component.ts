import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { Offre } from 'src/app/model'
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service'

@Component({
  selector: 'app-liste-offre',
  templateUrl: './liste-offre.component.html',
  styleUrls: ['./liste-offre.component.css'],
  providers:[MessageService]
})
export class ListeOffreComponent {
  offres: Offre[] = []
  constructor (private offreService: OffreSpecialeService, private messageService:MessageService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.offreService.getAll().subscribe(data => {
      this.offres = data;
    })
  }
}
