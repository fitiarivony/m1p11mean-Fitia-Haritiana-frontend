import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginEmpComponent } from './emp/login-emp/login-emp.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginManagerComponent } from './manager/login-manager/login-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginEmpComponent,
    LoginManagerComponent
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
