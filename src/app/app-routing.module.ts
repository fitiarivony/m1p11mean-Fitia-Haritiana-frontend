import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonnelComponent } from './manager/gestion-personnel/list-personnel/list-personnel.component';
import { AddPersonnelComponent } from './manager/gestion-personnel/add-personnel/add-personnel.component';
import { UpdatePersonnelComponent } from './manager/gestion-personnel/update-personnel/update-personnel.component';

import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
import { ShowPersonnelComponent } from './manager/gestion-personnel/show-personnel/show-personnel.component';
import { FichePersonnelComponent } from './manager/gestion-personnel/fiche-personnel/fiche-personnel.component';
import { GestionPreferenceComponent } from './clients/profil/gestion-preference/gestion-preference.component';

const routes: Routes = [
  { path: '', component: LoginEmpComponent },
  { path: 'emps', component: ListPersonnelComponent },
  { path: 'emps/add', component: AddPersonnelComponent },
  { path: 'emps/show/:id', component: FichePersonnelComponent },
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent },
  { path: 'login-manager', component: LoginManagerComponent },
  { path:'services/list',component: ListServiceComponent},
  { path:'services/create',component: CreateServiceComponent},
  { path:'services/update/:id',component: UpdateServiceComponent},
  { path:'client/preference',component: GestionPreferenceComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
