import { Employe } from "../model";
import { Client } from "./client";
import { Service } from "./service";

export interface Rdv{
  id_client:string;
  date_rdv:string;
  rdv_service:RdvService[]
}
export interface RdvService{
  id_employe:string,
  id_service:string,
  ordre:number,
  datedebut:Date,
  datefin:Date
}




export interface RdvFull{
  id_employe:Employe,
  id_service:Service,
  ordre:number,
  id_rdv:string,
  date_rdv:Date,
  id_client:Client
}

