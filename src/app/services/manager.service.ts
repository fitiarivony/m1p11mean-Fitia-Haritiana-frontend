import { Injectable } from '@angular/core';
import { Manager } from '../interfaces/manager';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  manager:Manager|null=null
  private apiUrl="https://m1p11mean-fitia-haritiana-backend.onrender.com/managers";
  constructor(
    private http: HttpClient,
   ) { }

  login(manager:Manager):Observable<any>  {

    let val=this.http.post<any>(this.apiUrl,{identifiant:manager.identifiant,mdp:manager.mdp})
    return val;
  }


}
