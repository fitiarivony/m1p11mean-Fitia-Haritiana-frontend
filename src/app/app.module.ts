import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { CreateServiceComponent } from './service/create-service/create-service.component';
import { UpdateServiceComponent } from './service/update-service/update-service.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginEmpComponent,
    LoginManagerComponent,
    ListServiceComponent,
    CreateServiceComponent,
    UpdateServiceComponent,
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
