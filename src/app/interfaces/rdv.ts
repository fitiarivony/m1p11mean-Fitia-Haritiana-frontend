import { Employe, Offre } from "../model";
import { Client } from "./client";
import { Service } from "./service";

export interface Rdv{
  id_client:string;
  date_rdv:string;
  reduction:string[]
  rdv_service:RdvService[]
}
export interface RdvService{
  id_employe:string,
  id_service:string,
  ordre:number,
  datedebut:Date,
  datefin:Date
}
export interface FullRdv{
  _id:string;
  id_client:string;
  date_rdv:string;
  paye:boolean;
  rdv_service:FullRdvService[]
}

export interface FullRdvService{
  id_employe:Employe,
  id_service:Service,
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
  id_client:Client,
  is_done:boolean,
  datedebut:Date,
  datefin:Date,
  prix:number,
}
export interface RdvFullSuivi{
  rdv:RdvFull[],
  total:number,
}



