import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonnelComponent } from './manager/list-personnel/list-personnel.component';
import { AddPersonnelComponent } from './manager/add-personnel/add-personnel.component';
import { UpdatePersonnelComponent } from './manager/update-personnel/update-personnel.component';

const routes: Routes = [
  { path: 'login', component: LoginEmpComponent },
  { path: 'emps', component: ListPersonnelComponent },
  { path: 'emps/add', component: AddPersonnelComponent },
  { path: 'emps/edit/:id', component: UpdatePersonnelComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
