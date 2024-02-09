import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServeService } from '../../services/serve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  service:Service={
    _id:"",
    nom_service:"",
    prix:0,
    duree:0,
    comission:0,
  }
  onlyNumber(){

  }

  createService(){
      this.serve_service.createService(this.service).subscribe(
        {
          next:service=>{
            this.router.navigate(['/services/list'])
          },error:err=>{
            console.log(err.message);
          }
        }
      )
  }
  constructor(private serve_service:ServeService,private router:Router){}
}
