import { Component, OnInit } from '@angular/core';
import { ServeService } from '../services/serve.service';
import { Service } from '../interfaces/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private serveService:ServeService) {
  }
  services:Service[]=[]
  ngOnInit(): void {
    this.serveService.listService().subscribe({
      next:valiny=>{
        this.services=valiny
      },
      error:err=>{
      }
    })
  }
  parseHour(diffMs:number){
    let tempsTravail:string="";
    if (diffMs >= 60) {
      const heures = Math.floor(diffMs / 60) // Calculer les heures
      const minutes = Math.round((diffMs % 60))
      let stringmin= ('0'+minutes).slice(-2)
      let stringhour= ('0'+heures).slice(-2)
      tempsTravail = `${stringhour} : ${stringmin} `
    } else {
      let stringmin= ('0'+diffMs).slice(-2)
      tempsTravail = `00:${stringmin}`
    }
    return tempsTravail;
  }

}
