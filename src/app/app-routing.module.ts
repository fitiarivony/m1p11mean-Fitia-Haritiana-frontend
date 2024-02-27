import { LoginEmpComponent } from './emp/login-emp/login-emp.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ListPersonnelComponent } from './manager/gestion-personnel/list-personnel/list-personnel.component'
import { AddPersonnelComponent } from './manager/gestion-personnel/add-personnel/add-personnel.component'
import { UpdatePersonnelComponent } from './manager/gestion-personnel/update-personnel/update-personnel.component'

import { LoginManagerComponent } from './manager/login-manager/login-manager.component'
import { ListServiceComponent } from './service/list-service/list-service.component'
import { CreateServiceComponent } from './service/create-service/create-service.component'
import { UpdateServiceComponent } from './service/update-service/update-service.component'
import { ShowPersonnelComponent } from './manager/gestion-personnel/show-personnel/show-personnel.component'
import { FichePersonnelComponent } from './manager/gestion-personnel/fiche-personnel/fiche-personnel.component'
import { GestionPreferenceComponent } from './clients/profil/gestion-preference/gestion-preference.component'
import { InscriptionClientComponent } from './clients/inscription-client/inscription-client.component'
import { LoginClientComponent } from './clients/login-client/login-client.component'
import { GestionPreferenceServicesComponent } from './clients/profil/gestion-preference-services/gestion-preference-services.component'
import { PriseRdvComponent } from './clients/prise-rdv/prise-rdv.component'
import { ListeOffreComponent } from './manager/gestion-offre/liste-offre/liste-offre.component'
import { AddOffreComponent } from './manager/gestion-offre/add-offre/add-offre.component'
import { ShowOffreComponent } from './manager/gestion-offre/show-offre/show-offre.component'
import { HistoriqueRdvComponent } from './clients/historique-rdv/historique-rdv.component'
import { SuiviRdvComponent } from './emp/suivi-rdv/suivi-rdv.component'
import { AffichageRdvComponent } from './emp/affichage-rdv/affichage-rdv.component'
import { UpdateRdvComponent } from './clients/update-rdv/update-rdv.component'
import { MoyennesComponent } from './manager/stat/moyennes/moyennes.component'
import { ListDepenseComponent } from './manager/depense/list-depense/list-depense.component'
import { CreateDepenseComponent } from './manager/depense/create-depense/create-depense.component'
import { UpdateDepenseComponent } from './manager/depense/update-depense/update-depense.component'
import { AuthGuard } from './guards/auth.guard'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent,title:'Accueil' },
  { path: 'emp/login', component: LoginEmpComponent,title:'Connexion Employé' },
  { path: 'emps', component: ListPersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager']  },title:'Liste du personnel' },
  { path: 'emps/add', component: AddPersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager']  },title:'Ajouter un employe' },
  { path: 'emps/show/:id', component: FichePersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager','employe']  } ,title:"Fiche de l'employé"},
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager','employe']  } ,title:'Mettre à jour un employé'},
  { path: 'login-manager', component: LoginManagerComponent, data:{ title:'Connexion du manager' } },
  { path: 'services/list', component: ListServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager']}  ,title:'Lister les services' },
  { path: 'services/create', component: CreateServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager']   },title:'Créer un service'},
  { path: 'services/update/:id', component: UpdateServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager']  },title:'Mettre à jour un service'},
  { path: 'client/preference', component: GestionPreferenceComponent,canActivate:[AuthGuard], data: { role: ['client'] },title:'Préférence des employés'  },
  { path: 'client/histo', component: HistoriqueRdvComponent,canActivate:[AuthGuard], data: { role: ['client']  } ,title:'Historique des rendez-vous'},
  { path: 'manager/stat', component: MoyennesComponent, canActivate:[AuthGuard], data: { role: ['manager'] },title:'Statistiques' },
  {
    path: 'client/pref/service',
    component: GestionPreferenceServicesComponent,
    canActivate:[AuthGuard], data: { role: ['client']},
    title:"Préférence des services"
  },
  { path: 'sign-up', component: InscriptionClientComponent,title:'Inscription client'},
  { path: 'sign-in', component: LoginClientComponent ,title:'Connexion client' },
  { path: 'prise-rdv', component: PriseRdvComponent,canActivate:[AuthGuard], data: { role: ['client'] },title:'Prendre rendez-vous' },
  { path: 'offre/liste', component: ListeOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] } ,title:'Liste des offres spéciales'},
  { path: 'offre/add', component: AddOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] },title:'Créer une offre spéciale' },
  { path: 'offre/show/:id', component: ShowOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] } ,title:'Fiche de cette offre spéciale'},
  {path:'emp/rdv/suivi',component:SuiviRdvComponent ,canActivate:[AuthGuard], data: { role: ['employe'] },title:'Suivi de  rendez-vous'},
  { path: 'rdv/show', component: AffichageRdvComponent ,canActivate:[AuthGuard], data: { role: ['employe'] },title:'Affichage des rendez-vous'},
  { path: 'rdv/update/:id', component: UpdateRdvComponent,canActivate:[AuthGuard], data: { role: ['client'] } ,title:'Modifier le rendez-vous'},
  { path: 'depenses/list', component: ListDepenseComponent ,canActivate:[AuthGuard], data: { role: ['manager'] },title:'Lister les dépenses' },
  { path: 'depenses/create', component: CreateDepenseComponent,canActivate:[AuthGuard], data: { role: ['manager'] } ,title:'Enregistrer une dépense'},
  { path: 'depenses/update/:id', component: UpdateDepenseComponent ,canActivate:[AuthGuard], data: { role: ['manager'] },title:'Mettre à jour la dépense'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
