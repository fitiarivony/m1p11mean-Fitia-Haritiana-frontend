import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';

const routes: Routes = [
  { path: 'login', component: LoginEmpComponent },
  { path: 'login-manager', component: LoginManagerComponent },
  {path:'services/list',component: ListServiceComponent},
  {path:'services/create',component: CreateServiceComponent},
  {path:'services/update/:id',component: UpdateServiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
