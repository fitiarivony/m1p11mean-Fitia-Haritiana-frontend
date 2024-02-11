import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { HttpClientModule } from '@angular/common/http';
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
import { GestionPreferenceServicesComponent } from './clients/profil/gestion-preference-services/gestion-preference-services.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginEmpComponent,
    ListPersonnelComponent,
    AddPersonnelComponent,
    UpdatePersonnelComponent,
    LoginManagerComponent,
    ListServiceComponent,
    CreateServiceComponent,
    UpdateServiceComponent,
    ShowPersonnelComponent,
    FichePersonnelComponent,
    GestionPreferenceComponent,
    GestionPreferenceServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
