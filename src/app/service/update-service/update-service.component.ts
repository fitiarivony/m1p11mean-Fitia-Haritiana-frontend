import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServeService } from '../../services/serve.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent {
  service:Service={
    _id:"",
    nom_service:"",
    prix:0,
    duree:0,
    comission:0,
  }
  onlyNumber(){

  }
  updateService(){
      this.serveService.updateService(this.service).subscribe({
        next:valiny=>{
          this.router.navigate(['/services/list']);
        },
        error:err=>console.log(err.error)
      })
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      let id_service = params['id']; // Access the 'id' parameter from the URL
      this.serveService.getServiceById(id_service).subscribe({
        next:valiny=>this.service=valiny,
        error:err=>console.log(err.error)
      })
    });
    // this.serveService.getServiceById()
  }
  constructor(private serveService:ServeService,private route: ActivatedRoute,private router:Router) {

  }
}
