import { ActivatedRoute } from '@angular/router';
import { HoraireString } from './../../model';
import { Component } from '@angular/core';
import { FullRdv, Rdv, RdvService } from 'src/app/interfaces/rdv';
import { ClientService } from 'src/app/services/client.service';
import { Rdv_Service } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-historique-rdv',
  templateUrl: './historique-rdv.component.html',
  styleUrls: ['./historique-rdv.component.css']
})
export class HistoriqueRdvComponent {
  historique:FullRdv[]=[]
  _id:string=""
  constructor(private clientService:ClientService,private rdvservice:Rdv_Service,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._id = localStorage.getItem('id')!
    this.clientService.getHistorique(this._id).subscribe({
      next: v => {
        v.map((el: { date_rdv: string | number | Date; })=>{
          el.date_rdv=new Date(el.date_rdv)
        })
        this.historique = v
      },
      error: err => {
        console.log(err)
      }
    })
  }
  annulerRdv(idRdv: string){
    this.rdvservice.annulerRdv(idRdv).subscribe({
      next: v => {
        let historiques=[...this.historique]
        this.historique=historiques.filter(h=>h._id!=idRdv);
      },error: err => {
        console.log(err.error);

      }

    });
  }
  returnCancellable(date_rdv:string){
    return new Date(date_rdv)>new Date();
  }
  updateLink(id_rdv:string){
    return "/rdv/update/"+id_rdv
  }
}
