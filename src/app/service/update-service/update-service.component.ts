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
  dureeMinutes:string="";
  onlyNumber(){

  }
  updateService(){
    let service={...this.service}
    let duree=this.dureeMinutes;
   let sep=duree.split(':');
    let minutes=parseInt(sep[0])*60+parseInt(sep[1]);
    service.duree=minutes;
  console.log(service);

      this.serveService.updateService(service).subscribe({
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
        next:valiny=>{
          this.service=valiny
          this.dureeMinutes=this.parseHour(valiny.duree);
        },
        error:err=>console.log(err.error)
      })
    });
    // this.serveService.getServiceById()
  }
  constructor(private serveService:ServeService,private route: ActivatedRoute,private router:Router) {

  }
  parseHour(diffMs:number){
    let tempsTravail:string="";
    if (diffMs >= 60) {
      const heures = Math.floor(diffMs / 60) // Calculer les heures
      const minutes = Math.round((diffMs % 60))
      let stringmin= ('0'+minutes).slice(-2)
      let stringhour= ('0'+heures).slice(-2)
      tempsTravail = `${stringhour}:${stringmin}`
    } else {
      let stringmin= ('0'+diffMs).slice(-2)
      tempsTravail = `00:${stringmin}`
    }
    return tempsTravail;
  }
}
