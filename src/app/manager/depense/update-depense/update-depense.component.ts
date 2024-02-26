import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Depense } from 'src/app/model';
import { DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-update-depense',
  templateUrl: './update-depense.component.html',
  styleUrls: ['./update-depense.component.css']
})
export class UpdateDepenseComponent {
  depense:Depense={
    _id:"",
    prix:0,
    motif:"",
    date_depense:new Date()
  }
  dureeMinutes:string="";
  onlyNumber(){

  }
  updateDepense(){


      this.depenseService.updateDepense(this.depense).subscribe({
        next:valiny=>{
          this.router.navigate(['/depenses/list']);
        },
        error:err=>console.log(err.error)
      })
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      let id_service = params['id']; // Access the 'id' parameter from the URL
      this.depenseService.getDepenseById(id_service).subscribe({
        next:valiny=>{
          this.depense=valiny
        },
        error:err=>console.log(err.error)
      })
    });
    // this.serveService.getServiceById()
  }
  constructor(private depenseService:DepenseService,private route: ActivatedRoute,private router:Router) {

  }
}
