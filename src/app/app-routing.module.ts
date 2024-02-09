import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonnelComponent } from './manager/list-personnel/list-personnel.component';
import { AddPersonnelComponent } from './manager/add-personnel/add-personnel.component';
import { UpdatePersonnelComponent } from './manager/update-personnel/update-personnel.component';

import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';

const routes: Routes = [
  { path: 'login', component: LoginEmpComponent },
  { path: 'emps', component: ListPersonnelComponent },
  { path: 'emps/add', component: AddPersonnelComponent },
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent },
  { path: 'login-manager', component: LoginManagerComponent },
  {path:'services/list',component: ListServiceComponent},
  {path:'services/create',component: CreateServiceComponent},
  {path:'services/update/:id',component: UpdateServiceComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
