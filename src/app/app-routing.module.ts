import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginManagerComponent } from './manager/login-manager/login-manager.component';

const routes: Routes = [
  { path: 'login', component: LoginEmpComponent }
  { path: 'login-manager', component: LoginManagerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
