import { Component, OnInit } from '@angular/core';
import { Rdv, RdvFull } from 'src/app/interfaces/rdv';
import { Rdv_Service } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-affichage-rdv',
  templateUrl: './affichage-rdv.component.html',
  styleUrls: ['./affichage-rdv.component.css']
})
export class AffichageRdvComponent implements OnInit {
  rdv:RdvFull[]=[]
  ngOnInit(): void {
    this.rdv_service.list_rdv_emp().subscribe(
      {
        next:rendez_vous=>{
          this.rdv=rendez_vous
        },
        error:err=>console.log(err.error)
      }
    )
  }
  constructor(private rdv_service:Rdv_Service) {

  }
  tokony_efa_vita(datefin:Date,datedebut:Date){
    if(new Date(datefin)<new Date()) return 1
    if (new Date(datefin)>new Date() && new Date(datedebut)<new Date()) return 0
    return -1;
  }


}
