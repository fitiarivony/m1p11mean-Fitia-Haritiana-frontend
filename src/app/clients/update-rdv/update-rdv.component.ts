import { Component, OnInit } from '@angular/core';
import { Rdv_Service } from 'src/app/services/rdv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rdv, RdvService } from 'src/app/interfaces/rdv';
import { Emp, Offre } from 'src/app/model';
import { Service } from 'src/app/interfaces/service';
import { MessageService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-update-rdv',
  templateUrl: './update-rdv.component.html',
  styleUrls: ['./update-rdv.component.css'],
  providers:[MessageService]
})
export class UpdateRdvComponent implements OnInit {
  id_rdv:string="";
  currentrdv: RdvService = {
    id_employe: '',
    id_service: '',
    ordre: 0,
    datedebut: new Date(),
    datefin: new Date(),
  };
  rdv: Rdv = {
    id_client: '',
    date_rdv: '',
    reduction:[],
    rdv_service: [],
  };
  reduction: Offre[] = []
  reducs: Offre[]=[]
  fav_emp: Emp[] = [];
  employe: Emp[] = [];
  service: Service[] = [];

  filteredEmp: Emp[] = [];

  testService: Service | null = null;

  visible: boolean = false;
  isMobileScreen:boolean = false;
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  filterEmp(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (const employe of this.fav_emp) {
      if (employe.nom_prenom.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(employe);
      }
    }
    this.filteredEmp = filtered;
  }

  mydragStartServe(service: Service) {
    this.testService = service;
  }

  mydropServe() {
    if (this.testService) {
      this.currentrdv.id_service = this.testService._id;
      this.onSelectService();
      this.showDialog();
      this.testService = null;
    }
  }

  mydragEndServe() {
    this.testService = null;
  }

  constructor(private rdvservice: Rdv_Service, private route: ActivatedRoute,private messageService:MessageService,private router:Router,private breakpointObserver:BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobileScreen = result.matches;
    });
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
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id_rdv = params['id']; // Access the 'id' parameter from the URL
      this.rdvservice.getRdvById(id_rdv).subscribe({
        next: (data) => {
          console.log(data.rdv);
          let tab: Emp[] = data.employe;
          tab.forEach((emp: Emp) => {
            emp.nom_prenom = emp.nom + ' ' + emp.prenom;
          });
          this.employe = tab;
          this.service = data.service;
          this.fav_emp = data.employe;
          this.reduction = data.reduction
          this.reducs=data.reduction
          this.reduction=this.reducs.filter(el=>el.dateDebut<data.rdv.date_rdv && el.dateFin>data.rdv.date_rdv)
          this.rdv = data.rdv;
          this.id_rdv=data.rdv._id;
          this.rdv.date_rdv=this.formatDateTimeForInput(this.rdv.date_rdv);

          this.initReduction()
        },
        error: (err) => console.log(err.error),
      });
    });
  }
  initService(){
    this.service.map(el => {
      // console.log(reduction.service._id, el._id);
        if (el.pi === undefined) el.pi = el.prix
        if (el.reduc === undefined) el.reduc = 0
        el.reduc = 0
        el.prix = (el.pi * (100 - el.reduc)) / 100
    })
  }
  initReduction(){

    this.rdv.reduction.map((red)=>{
      this.reduction.map((reduction)=>{
        if(reduction._id===red){
          this.service.map(el => {
            // console.log(reduction.service._id, el._id);
            if (reduction.service._id === el._id) {
              if (el.pi === undefined) el.pi = el.prix
              if (el.reduc === undefined) el.reduc = 0
              el.reduc += reduction.reduction
              el.prix = (el.pi * (100 - el.reduc)) / 100
            }
          })
        }
      })
    })
  }
  updateReductionList (index: number) {
    let reduction = this.reduction[index]
    if (!this.rdv.reduction.includes(this.reduction[index]._id)) {
      this.rdv.reduction.push(this.reduction[index]._id)
      this.service.map(el => {
        if (reduction.service._id === el._id) {
          if (el.pi === undefined) el.pi = el.prix
          if (el.reduc === undefined) el.reduc = 0
          el.reduc += reduction.reduction
          el.prix = (el.pi * (100 - el.reduc)) / 100
        }
      })
    } else {
      this.rdv.reduction.splice(
        this.rdv.reduction.indexOf(this.reduction[index]._id),
        1
      )
      this.service.map(el => {
        if (reduction.service._id === el._id) {
          if (el.pi === undefined) el.pi = el.prix
          if (el.reduc === undefined) el.reduc = 0
          el.reduc -= reduction.reduction
          el.prix = (el.pi * (100 - el.reduc)) / 100
        }
      })
    }
  }

  onChangeDateRDV() {
    let rendez_vous = { ...this.rdv };
    rendez_vous.rdv_service = [...this.rdv.rdv_service];
    if (this.rdv.date_rdv === '') {
      // console.log('Tsis daty');
      this.rdv.rdv_service = [...rendez_vous.rdv_service];
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut: new Date(),
        datefin: new Date(),
      };
    } else {
      try {
        this.rdvservice
        .check_horaire(rendez_vous, this.employe, this.service,this.id_rdv)
        .subscribe({
          next: (val) => {
            // console.log('Mety eh');
            // console.log(rendez_vous.rdv_service);
            this.reduction=this.reducs.filter(el=>el.dateDebut<rendez_vous.date_rdv && el.dateFin>rendez_vous.date_rdv)
            let idValable:string[]=[]
            this.reduction.map((el: Offre)=>{
              idValable.push(el._id)
            })
            this.rdv.reduction=this.rdv.reduction.filter(el=>idValable.includes(el))
            this.initService()
            this.initReduction()
            this.rdv.rdv_service = [...rendez_vous.rdv_service];
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut: new Date(),
              datefin: new Date(),
            };
          },
          error: (err) => {
            // console.log(err);
            // alert(err);
            this.messageService.add({severity: 'error', detail:err.error})
          },
        });
      } catch (error:any) {
        this.messageService.add({severity: 'error', detail:error.message})
      }

    }
  }

  check_date(rendez_vous: Rdv) {
    if (this.rdv.date_rdv === '') {
      // console.log('Tsis daty');
      this.rdv.rdv_service = [...rendez_vous.rdv_service];
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut: new Date(),
        datefin: new Date(),
      };
    } else {
      try{
        this.rdvservice
        .check_horaire(rendez_vous, this.employe, this.service,this.id_rdv)
        .subscribe({
          next: (val) => {
            // console.log('Mety eh');
            // console.log(rendez_vous.rdv_service);

            this.rdv.rdv_service = [...rendez_vous.rdv_service];
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut: new Date(),
              datefin: new Date(),
            };
          },
          error: (err) => {
            // console.log(err.message);
            this.messageService.add({severity: 'error', detail:err.error})
          },
        });
      }catch(error:any){
        this.messageService.add({severity: 'error', detail:error.message})
      }

    }
  }
  addSeance() {
    try {
      // console.log('Ajouter seance');
      let rendez_vous = { ...this.rdv };
      rendez_vous.rdv_service = [...this.rdv.rdv_service];
      rendez_vous.rdv_service.push(this.currentrdv);
      this.check_date(rendez_vous);
      this.closeDialog();
    } catch (error:any) {
      this.closeDialog();
      this.messageService.add({ severity: 'error',  detail: error.message });
    }

  }

  deleteSeance(rdv: RdvService) {
    let rendez_vous = { ...this.rdv };
    rendez_vous.rdv_service = [...this.rdv.rdv_service];
    rendez_vous.rdv_service = this.rdv.rdv_service.filter(
      (rendez_vous) => rendez_vous != rdv
    );
    this.check_date(rendez_vous);
  }
  monterOrdre(ind: number) {
    let rendez_vous = { ...this.rdv };
    rendez_vous.rdv_service = [...this.rdv.rdv_service];
    let hiakatra = rendez_vous.rdv_service[ind];
    let hidina = rendez_vous.rdv_service[ind - 1];
    rendez_vous.rdv_service[ind] = hidina;
    rendez_vous.rdv_service[ind - 1] = hiakatra;
    this.check_date(rendez_vous);
  }
  descendreOrdre(ind: number) {
    let rendez_vous = { ...this.rdv };
    rendez_vous.rdv_service = [...this.rdv.rdv_service];
    let hidina = rendez_vous.rdv_service[ind];
    let hiakatra = rendez_vous.rdv_service[ind + 1];
    rendez_vous.rdv_service[ind + 1] = hidina;
    rendez_vous.rdv_service[ind] = hiakatra;
    this.check_date(rendez_vous);
  }
  updateRdv() {
    try{
      this.rdvservice.update_rdv(this.rdv, this.employe, this.service,this.id_rdv)?.subscribe({
        next: (data) => {
          this.router.navigate(['/client/histo'])
        },
        error: (err) =>{
          this.messageService.add({severity: 'error', detail:err.error})
        }
      });
    }catch(error:any){
      this.messageService.add({severity: 'error', detail:error.message})
    }

  }
  buttonSelectService(_id:string){
    this.currentrdv.id_service = _id
    this.onSelectService()
    this.showDialog()
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
      let tab = emp.services.filter(
        (serv) => this.currentrdv.id_service.toString() == serv.toString()
      );
      if (tab.length != 0) {
        newData.push(emp);
      }
    }
    this.fav_emp = newData;
  }
  onSelectEmp(event: any) {
    this.currentrdv.id_employe = event._id;
  }
  hideDialog(){

    this.currentrdv = {
      id_employe: '',
      id_service: '',
      ordre: 0,
      datedebut: new Date(),
      datefin: new Date(),
    };
  }
}
