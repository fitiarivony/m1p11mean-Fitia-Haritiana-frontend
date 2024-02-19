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

const routes: Routes = [
  { path: '', component: LoginEmpComponent },
  { path: 'emps', component: ListPersonnelComponent },
  { path: 'emps/add', component: AddPersonnelComponent },
  { path: 'emps/show/:id', component: FichePersonnelComponent },
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent },
  { path: 'login-manager', component: LoginManagerComponent },
  { path: 'services/list', component: ListServiceComponent },
  { path: 'services/create', component: CreateServiceComponent },
  { path: 'services/update/:id', component: UpdateServiceComponent },
  { path: 'client/preference', component: GestionPreferenceComponent },
  { path: 'client/histo', component: HistoriqueRdvComponent },
  {
    path: 'client/pref/service',
    component: GestionPreferenceServicesComponent
  },
  { path: 'sign-up', component: InscriptionClientComponent },
  { path: 'sign-in', component: LoginClientComponent },
  { path: 'prise-rdv', component: PriseRdvComponent },
  { path: 'offre/liste', component: ListeOffreComponent },
  { path: 'offre/add', component: AddOffreComponent },
  { path: 'offre/show/:id', component: ShowOffreComponent },
  {path:'emp/rdv/suivi',component:SuiviRdvComponent},
  { path: 'rdv/show', component: AffichageRdvComponent },
  { path: 'rdv/update/:id', component: UpdateRdvComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
