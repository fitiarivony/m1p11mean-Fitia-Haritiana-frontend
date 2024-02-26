import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Depense } from 'src/app/model';
import { DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-create-depense',
  templateUrl: './create-depense.component.html',
  styleUrls: ['./create-depense.component.css']
})
export class CreateDepenseComponent {
  depense:Depense={
    _id:"",
    date_depense:new Date(),
    prix:0,
    motif:""
  }
  dureeMinutes:number = 0
  onlyNumber(){

  }

  createDepense(){

      this.depense_service.createDepense(this.depense).subscribe(
        {
          next:depense=>{
            this.router.navigate(['/depenses/list'])
          },error:err=>{
            console.log(err.message);
          }
        }
      )
  }
  constructor(private depense_service:DepenseService,private router:Router){}
}
