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
  constructor(
    private http: HttpClient,
   ) { }

  login(manager:Manager):Observable<any>  {

    let val=this.http.get<any>(`http://localhost:8000/managers?identifiant=${manager.identifiant}&mdp=${manager.mdp}`)
    return val;
  }


}
