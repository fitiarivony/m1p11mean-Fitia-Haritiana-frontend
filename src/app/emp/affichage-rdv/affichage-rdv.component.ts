import { Component, OnInit } from '@angular/core';
import { Rdv, RdvFull } from 'src/app/interfaces/rdv';
import { Service } from 'src/app/interfaces/service';
import { EmpService } from 'src/app/services/emp.service';
import { Rdv_Service } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-affichage-rdv',
  templateUrl: './affichage-rdv.component.html',
  styleUrls: ['./affichage-rdv.component.css']
})
export class AffichageRdvComponent implements OnInit {
  rdv:RdvFull[]=[]
  datedebut:string="";
  datefin:string="";
  service:Service[]=[]

  ngOnInit(): void {
    this.emp_service.list_rdv_emp().subscribe(
      {
        next:rendez_vous=>{

          this.rdv=rendez_vous.donnee;
          this.service=rendez_vous.service
          console.log(rendez_vous);

        },
        error:err=>console.log(err.error)
      }
    )
  }
  constructor(private emp_service:EmpService, private rdv_service:Rdv_Service) {

  }
  tokony_efa_vita(datefin:Date,datedebut:Date){
    if(new Date(datefin)<new Date()) return 1
    if (new Date(datefin)>new Date() && new Date(datedebut)<new Date()) return 0
    return -1;
  }

  marquer_vita(item:RdvFull){
    this.rdv_service.suivi_tache(item.id_rdv,item.id_employe._id,item.id_service._id,!item.is_done).subscribe({
      next:val=>{
        let filteredArray = this.rdv.filter(obj => obj === item);
        // Get the index of an object in the array
        let index = this.rdv.indexOf(filteredArray[0]);
        let rdvs=[...this.rdv]
        rdvs[index].is_done=!item.is_done;
        this.rdv=rdvs;
      },
      error:err =>{console.log("error")}
    })
  }

  filtre_rdv(){
    let debut=null;
    let fin=null;
    if (this.datedebut!=="") {
      debut=new Date(this.datedebut);
    }
    if (this.datefin!=="")  {
      fin=new Date(this.datefin);
    }
    this.emp_service.filtre_rdv_emp(debut,fin).subscribe({
      next:valiny=>{
        // console.log(valiny);
        this.rdv=valiny;

      },
      error:err=>{
        console.log(err);

      }

    })
  }


}
