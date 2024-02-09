import { Component } from '@angular/core';
import { ServeService } from '../../services/serve.service';
import { Service } from 'src/app/interfaces/service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent {
  services:Service[]|[]=[]
  constructor(private serveService:ServeService){

  }
  ngOnInit(){
    this.serveService.listService().subscribe({
      next:services=>{
        this.services=services;
      },error :err =>{
        console.log(err.message);
      }
    })
  }
  deleteService(_id:string){
    this.serveService.deleteService(_id).subscribe({
      next:code=>{
        this.services=this.services.filter(service=>service._id!=_id)
      },
      error:err=>console.log(err.message)
    });

  }
}
