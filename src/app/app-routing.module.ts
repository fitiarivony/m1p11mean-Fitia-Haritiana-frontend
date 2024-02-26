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

const routes: Routes = [
  { path: '', component: LoginEmpComponent },
  { path: 'emps', component: ListPersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'emps/add', component: AddPersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'emps/show/:id', component: FichePersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager','employe'] } },
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent,canActivate:[AuthGuard], data: { role: ['manager','employe'] } },
  { path: 'login-manager', component: LoginManagerComponent },
  { path: 'services/list', component: ListServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager'] }},
  { path: 'services/create', component: CreateServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager'] }},
  { path: 'services/update/:id', component: UpdateServiceComponent ,canActivate:[AuthGuard], data: { role: ['manager'] }},
  { path: 'client/preference', component: GestionPreferenceComponent,canActivate:[AuthGuard], data: { role: ['client'] } },
  { path: 'client/histo', component: HistoriqueRdvComponent,canActivate:[AuthGuard], data: { role: ['client'] } },
  { path: 'manager/stat', component: MoyennesComponent, canActivate:[AuthGuard], data: { role: ['manager'] }},
  {
    path: 'client/pref/service',
    component: GestionPreferenceServicesComponent,
    canActivate:[AuthGuard], data: { role: ['client'] }
  },
  { path: 'sign-up', component: InscriptionClientComponent },
  { path: 'sign-in', component: LoginClientComponent },
  { path: 'prise-rdv', component: PriseRdvComponent,canActivate:[AuthGuard], data: { role: ['client'] } },
  { path: 'offre/liste', component: ListeOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'offre/add', component: AddOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'offre/show/:id', component: ShowOffreComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  {path:'emp/rdv/suivi',component:SuiviRdvComponent ,canActivate:[AuthGuard], data: { role: ['employe'] }},
  { path: 'rdv/show', component: AffichageRdvComponent ,canActivate:[AuthGuard], data: { role: ['employe'] }},
  { path: 'rdv/update/:id', component: UpdateRdvComponent,canActivate:[AuthGuard], data: { role: ['client'] } },
  { path: 'depenses/list', component: ListDepenseComponent ,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'depenses/create', component: CreateDepenseComponent,canActivate:[AuthGuard], data: { role: ['manager'] } },
  { path: 'depenses/update/:id', component: UpdateDepenseComponent ,canActivate:[AuthGuard], data: { role: ['manager'] }},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
