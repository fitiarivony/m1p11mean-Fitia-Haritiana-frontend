import { ActivatedRoute } from '@angular/router';
import { HoraireString } from './../../model';
import { Component } from '@angular/core';
import { FullRdv, Rdv, RdvService } from 'src/app/interfaces/rdv';
import { ClientService } from 'src/app/services/client.service';
import { Rdv_Service } from 'src/app/services/rdv.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-historique-rdv',
  templateUrl: './historique-rdv.component.html',
  styleUrls: ['./historique-rdv.component.css'],
  providers:[MessageService]
})
export class HistoriqueRdvComponent {
  historique: FullRdv[] = [];
  _id: string = '';
  constructor(
    private clientService: ClientService,
    private rdvservice: Rdv_Service,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._id = localStorage.getItem('id')!;
    this.clientService.getHistorique(this._id).subscribe({
      next: (v) => {
        v.map((el: { date_rdv: string | number | Date }) => {
          el.date_rdv = new Date(el.date_rdv);
        });
        this.historique = v;
      },
      error: (err) => {
        this.messageService.add({severity: 'error', detail:err.error});
        // console.log(err);
      },
    });
  }
  annulerRdv(idRdv: string) {
    this.rdvservice.annulerRdv(idRdv).subscribe({
      next: (v) => {
        let historiques = [...this.historique];
        this.historique = historiques.filter((h) => h._id != idRdv);
      },
      error: (err) => {
        this.messageService.add({severity: 'error', detail:err.error})
      },
    });
  }
  returnCancellable(date_rdv: string) {
    return new Date(date_rdv) > new Date();
  }
  payerRdv(idRdv: string) {
    // console.log('Je paie');
    let filteredArray = this.historique.filter(obj => obj._id === idRdv);
    // Get the index of an object in the array
    let index = this.historique.indexOf(filteredArray[0]);

    this.rdvservice.payerRdv(idRdv).subscribe({
      next: (val) => {
        let historiques=[...this.historique]
        historiques[index].paye=true;
        this.historique=historiques;
        // console.log(val)
      },
      error: (err) =>   this.messageService.add({severity: 'error', detail:err.error}),
    });


  }
}
