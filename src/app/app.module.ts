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
import { InscriptionClientComponent } from './clients/inscription-client/inscription-client.component';
import { LoginClientComponent } from './clients/login-client/login-client.component';
import { PriseRdvComponent } from './clients/prise-rdv/prise-rdv.component';
import { ListeOffreComponent } from './manager/gestion-offre/liste-offre/liste-offre.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddOffreComponent } from './manager/gestion-offre/add-offre/add-offre.component';
import { ShowOffreComponent } from './manager/gestion-offre/show-offre/show-offre.component';
import { HistoriqueRdvComponent } from './clients/historique-rdv/historique-rdv.component';
import { AffichageRdvComponent } from './emp/affichage-rdv/affichage-rdv.component';
import { SuiviRdvComponent } from './emp/suivi-rdv/suivi-rdv.component';
import { UpdateRdvComponent } from './clients/update-rdv/update-rdv.component';

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
    GestionPreferenceServicesComponent,
    InscriptionClientComponent,
    LoginClientComponent,
    PriseRdvComponent,
    ListeOffreComponent,
    AddOffreComponent,
    ShowOffreComponent,
    HistoriqueRdvComponent,
    AffichageRdvComponent,
    SuiviRdvComponent,
    UpdateRdvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
