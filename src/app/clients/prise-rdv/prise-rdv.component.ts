import { Component, OnInit } from '@angular/core';
import { Rdv, RdvService } from 'src/app/interfaces/rdv';
import { Service } from 'src/app/interfaces/service';
import { Emp } from 'src/app/model';
import { Rdv_Service } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css'],
})
export class PriseRdvComponent implements OnInit {
  currentrdv: RdvService = {
    id_employe: '',
    id_service: '',
    ordre: 0,
    datedebut:new Date(),
    datefin:new Date()
  };
  rdv: Rdv = {
    id_client: '',
    date_rdv: '',
    rdv_service: [],
  };
  fav_emp:Emp[]=[]
  employe: Emp[] = [];
  service: Service[] = [];

  onChangeDateRDV(){
    let rendez_vous={...this.rdv}
    rendez_vous.rdv_service=[...this.rdv.rdv_service];
    if (this.rdv.date_rdv==="") {
      console.log("Tsis daty");
      this.rdv.rdv_service=[...rendez_vous.rdv_service]
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut:new Date(),
      datefin:new Date()
      };

    }else{
      this.rendez_vous_service.check_horaire(rendez_vous,this.employe,this.service,undefined).subscribe(
        {
          next: val=>{
            console.log("Mety eh");
            console.log(rendez_vous.rdv_service);

            this.rdv.rdv_service=[...rendez_vous.rdv_service]
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut:new Date(),
            datefin:new Date()
            };

          },
          error: err=>{
            console.log(err);
           alert(err)
          }
        }
      )
    }
  }

  check_date(rendez_vous:Rdv){
    if (this.rdv.date_rdv==="") {
      console.log("Tsis daty");
      this.rdv.rdv_service=[...rendez_vous.rdv_service]
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut:new Date(),
      datefin:new Date()
      };

    }else{
      this.rendez_vous_service.check_horaire(rendez_vous,this.employe,this.service,undefined).subscribe(
        {
          next: val=>{
            console.log("Mety eh");
            console.log(rendez_vous.rdv_service);

            this.rdv.rdv_service=[...rendez_vous.rdv_service]
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut:new Date(),
            datefin:new Date()
            };

          },
          error: err=>{console.log(err);
          }
        }
      )
    }

  }
  addSeance() {
    console.log("Ajouter seance");
      let rendez_vous={...this.rdv}
      rendez_vous.rdv_service=[...this.rdv.rdv_service]
      rendez_vous.rdv_service.push(this.currentrdv);
     this.check_date(rendez_vous);

  }

  deleteSeance(rdv: RdvService) {
    let rendez_vous={...this.rdv}
    rendez_vous.rdv_service=[...this.rdv.rdv_service]
   rendez_vous.rdv_service = this.rdv.rdv_service.filter(
      (rendez_vous) => rendez_vous != rdv
    );
    this.check_date(rendez_vous);
  }
  monterOrdre(ind: number) {
    let rendez_vous={...this.rdv}
    rendez_vous.rdv_service=[...this.rdv.rdv_service]
    let hiakatra = rendez_vous.rdv_service[ind];
    let hidina = rendez_vous.rdv_service[ind - 1];
   rendez_vous.rdv_service[ind] = hidina;
   rendez_vous.rdv_service[ind - 1] = hiakatra;
    this.check_date(rendez_vous);
  }
  descendreOrdre(ind: number) {
    let rendez_vous={...this.rdv}
    rendez_vous.rdv_service=[...this.rdv.rdv_service]
    let hidina = rendez_vous.rdv_service[ind];
    let hiakatra = rendez_vous.rdv_service[ind + 1];
   rendez_vous.rdv_service[ind + 1] = hidina;
   rendez_vous.rdv_service[ind] = hiakatra;
   this.check_date(rendez_vous)
  }
  ngOnInit() {
    this.rendez_vous_service.prepare_prise_rdv().subscribe({
      next: (data) => {
        this.employe = data.employe;
        this.service = data.service;
        this.fav_emp=data.employe;
      },
      error: (err) => console.log(err.message),
    });
  }

  constructor(private rendez_vous_service: Rdv_Service) {}
  addRdv() {
     this.rendez_vous_service.add_rdv(this.rdv,this.employe,this.service)?.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err.error),
    });
  }

  getSelectedEmp(id: string) {
    return this.employe.filter((emp) => emp._id === id)[0];
  }
  getSelectedService(id: string) {
    return this.service.filter((serve) => serve._id === id)[0];
  }
  onSelectService() {
    let newData: Emp[] = [];
    for (const emp of this.employe) {
      let tab=emp.services.filter(serv=>this.currentrdv.id_service.toString()==serv.toString())
      if (tab.length!=0) {
        newData.push(emp);
      }
    }
    this.fav_emp = newData;
  }
}
