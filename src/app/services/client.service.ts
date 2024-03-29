import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://m1p11mean-fitia-haritiana-backend.onrender.com/clients'

  constructor(private http: HttpClient) {}
  createClient(client:Client){
    return this.http.post<Client>(`${this.apiUrl}`.concat('/sign-up'),client,{headers: {'Content-Type': 'application/json'}});
  }
  loginClient(client:Client){
    return this.http.post(`${this.apiUrl}`.concat('/sign-in'),client,{headers: {'Content-Type': 'application/json'}});
  }
  getNames():Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/names')
    let val = this.http.get(postUrl,{headers: {'Content-Type': 'application/json'}})
    return val
  }
  getFavEmp(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/fav-emps/').concat(id)
    let val = this.http.get(postUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  setFavEmp(id:string, fav_emps:string[]):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/fav-emps/').concat(id)
    let val = this.http.post(postUrl, fav_emps, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  getFavServ(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/fav-serv/').concat(id)
    let val = this.http.get(postUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  setFavServ(id:string, fav_emps:string[]):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/fav-serv/').concat(id)
    let val = this.http.post(postUrl, fav_emps, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  getHistorique(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/histo/').concat(id)
    let val = this.http.get(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
}
