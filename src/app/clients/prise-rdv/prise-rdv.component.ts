import { Component, OnInit } from '@angular/core'
import { Rdv, RdvService } from 'src/app/interfaces/rdv'
import { Service } from 'src/app/interfaces/service'
import { Emp, Offre, ValidatorOperatorField } from 'src/app/model'
import { Rdv_Service } from 'src/app/services/rdv.service'
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType
} from 'primeng/api';
import { DevDuetValidator } from 'src/app/validator'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PriseRdvComponent implements OnInit {
  currentrdv: RdvService = {
    id_employe: '',
    id_service: '',
    ordre: 0,
    datedebut: new Date(),
    datefin: new Date()
  }
  rdv: Rdv = {
    id_client: '',
    date_rdv: '',
    reduction: [],
    rdv_service: []
  }
  fav_emp: Emp[] = []
  employe: Emp[] = []
  service: Service[] = []
  reduction: Offre[] = []
  reducs: Offre[]=[]

  filteredEmp: Emp[] = []

  testService: Service | null = null

  visible: boolean = false;
  isLoading: boolean = true;
  isMobileScreen: boolean = false;


  concatFields (service: Service): string {
    return `${service.nom_service} - ${service.prix}`
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

  showDialog () {
    this.visible = true
  }

  closeDialog () {
    this.visible = false
  }

  filterEmp (event: any) {
    let filtered: any[] = []
    let query = event.query
    for (const employe of this.fav_emp) {
      if (employe.nom_prenom.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(employe)
      }
    }
    this.filteredEmp = filtered
  }

  mydragStartServe (service: Service) {
    this.testService = service
  }

  mydropServe () {
    if (this.testService) {
      this.currentrdv.id_service = this.testService._id
      this.onSelectService()
      this.showDialog()
      this.testService = null
    }
  }
  buttonSelectService(_id:string){
    this.currentrdv.id_service = _id
    this.onSelectService()
    this.showDialog()
  }
  mydragEndServe () {
    this.testService = null
  }

  onChangeDateRDV () {
    let rendez_vous = { ...this.rdv }
    rendez_vous.rdv_service = [...this.rdv.rdv_service]
    if (this.rdv.date_rdv === '') {
      // console.log('Tsis daty')
      this.rdv.rdv_service = [...rendez_vous.rdv_service]
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut: new Date(),
        datefin: new Date()
      }
    } else {
      try {
        this.rendez_vous_service
        .check_horaire(rendez_vous, this.employe, this.service, undefined)
        .subscribe({
          next: val => {
            // console.log('Mety eh')
            // console.log(rendez_vous.rdv_service)
            this.reduction=this.reducs.filter(el=>el.dateDebut<rendez_vous.date_rdv && el.dateFin>rendez_vous.date_rdv)
            let idValable:string[]=[]
            this.reduction.map((el: Offre)=>{
              idValable.push(el._id)
            })
            this.rdv.reduction=this.rdv.reduction.filter(el=>idValable.includes(el))
            this.initService()
            this.initReduction()
            this.rdv.rdv_service = [...rendez_vous.rdv_service]
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut: new Date(),
              datefin: new Date()
            }
          },
          error: err => {
            // console.log(err)
            // alert(err)


            this.messageService.add({severity: 'error', detail:err.error});
          }
        })
      } catch (error:any) {
        this.messageService.add({severity: 'error', detail:error.message});
      }

    }
  }

  check_date (rendez_vous: Rdv) {
    if (this.rdv.date_rdv === '') {
      // console.log('Tsis daty')
      this.rdv.rdv_service = [...rendez_vous.rdv_service]
      this.currentrdv = {
        id_employe: '',
        id_service: '',
        ordre: 0,
        datedebut: new Date(),
        datefin: new Date()
      }
    } else {
      try{
        this.rendez_vous_service
        .check_horaire(rendez_vous, this.employe, this.service, undefined)
        .subscribe({
          next: val => {
            // console.log('Mety eh')
            // console.log(rendez_vous.rdv_service)

            this.rdv.rdv_service = [...rendez_vous.rdv_service]
            this.currentrdv = {
              id_employe: '',
              id_service: '',
              ordre: 0,
              datedebut: new Date(),
              datefin: new Date()
            }
          },
          error: (error:any) => {
            // console.log(error);
            this.closeDialog();
            this.messageService.add({ severity: 'error',  detail: error.error });
          },
        });
      }catch(error:any){
        this.messageService.add({ severity: 'error',  detail: error.message });
      }

    }
  }
  addSeance () {
    try {
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

  deleteSeance (rdv: RdvService) {
    let rendez_vous = { ...this.rdv }
    rendez_vous.rdv_service = [...this.rdv.rdv_service]
    rendez_vous.rdv_service = this.rdv.rdv_service.filter(
      rendez_vous => rendez_vous != rdv
    )
    this.check_date(rendez_vous)
  }

  monterOrdre (ind: number) {
    let rendez_vous = { ...this.rdv }
    rendez_vous.rdv_service = [...this.rdv.rdv_service]
    let hiakatra = rendez_vous.rdv_service[ind]
    let hidina = rendez_vous.rdv_service[ind - 1]
    rendez_vous.rdv_service[ind] = hidina
    rendez_vous.rdv_service[ind - 1] = hiakatra
    this.check_date(rendez_vous)
  }

  descendreOrdre (ind: number) {
    let rendez_vous = { ...this.rdv }
    rendez_vous.rdv_service = [...this.rdv.rdv_service]
    let hidina = rendez_vous.rdv_service[ind]
    let hiakatra = rendez_vous.rdv_service[ind + 1]
    rendez_vous.rdv_service[ind + 1] = hidina
    rendez_vous.rdv_service[ind] = hiakatra
    this.check_date(rendez_vous)
  }


  ngOnInit() {
    this.isLoading=true;

    this.rendez_vous_service.prepare_prise_rdv().subscribe({
      next: data => {
        let tab: Emp[] = data.employe
        tab.forEach((emp: Emp) => {
          emp.nom_prenom = emp.nom + ' ' + emp.prenom;
        });
        this.employe = tab;
        this.service = data.service;
        this.fav_emp = tab;
        this.reduction = data.reduction
        this.reducs=data.reduction
        setTimeout(() => {
          // Marque  chargement comme terminé
          this.isLoading = false;
        }, 2000);
      },
      error: err =>   this.messageService.add({severity: 'error', detail:err.error})
    })
  }

  constructor (
    private rendez_vous_service: Rdv_Service,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobileScreen = result.matches;
    });
  }

  addRdv () {
   let validators:ValidatorOperatorField[]=[
    {
      champ:'date_rdv',
      errorMessage:'La date de rendez-vous est obligatoire',
      valeur:'',
      operator:'='
    },
    {
      champ:'rdv_service',
      errorMessage:'Le service à faire pour le rendez-vous est obligatoire',
      valeur:'',
      operator:'array'
    },

   ]
   let validationErrorMessages=DevDuetValidator.validateAdvanceData(this.rdv,validators);
   if(new Date(this.rdv.date_rdv)<=new Date() || isNaN(new Date(this.rdv.date_rdv).valueOf())){
    validationErrorMessages.push("La date de rendez-vous doit être supérieur qu'en ce moment")
   }
   if (validationErrorMessages.length > 0) {
      this.messageService.add({severity:'error', detail:validationErrorMessages.join(',')})
   }
   else{
    try {
      this.rendez_vous_service
      .add_rdv(this.rdv, this.employe, this.service)
      ?.subscribe({
        next: data =>  {},
        error: err => this.messageService.add({severity: 'error', detail:err.error})
      })
    } catch (error:any) {
      this.messageService.add({severity: 'error', detail:error.message})
    }

    }
  }

  getSelectedEmp (id: string) {
    return this.employe.filter(emp => emp._id === id)[0]
  }
  getSelectedService (id: string) {
    return this.service.filter(serve => serve._id === id)[0]
  }
  onSelectService () {
    let newData: Emp[] = []
    for (const emp of this.employe) {
      let tab = emp.services.filter(
        serv => this.currentrdv.id_service.toString() == serv.toString()
      )
      if (tab.length != 0) {
        newData.push(emp)
      }
    }
    this.fav_emp = newData
  }
  onSelectEmp (event: any) {
    this.currentrdv.id_employe = event._id
  }
  hideDialog () {
    this.currentrdv = {
      id_employe: '',
      id_service: '',
      ordre: 0,
      datedebut: new Date(),
      datefin: new Date()
    }
  }
}
