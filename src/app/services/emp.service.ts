import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Employe, FormEmploye, Genre, Login } from '../model'
import { RdvFull } from '../interfaces/rdv'
import { Service } from '../interfaces/service'
@Injectable({
  providedIn: 'root'
})

export class EmpService {
  private apiUrl = 'https://m1p11mean-fitia-haritiana-backend.onrender.com/emp'
  private rdvUrl='https://m1p11mean-fitia-haritiana-backend.onrender.com/rdv'
  constructor (private http: HttpClient) {}

  postData (data: Login): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/login')
    let val = this.http.post(postUrl, data)
    return val
  }
  getAll (): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.get(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  getAllNames (): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/names')
    let val = this.http.get(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  inscription (data: FormEmploye): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.post(postUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  update (data: FormEmploye, id:string): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.put(postUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  getOne(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.get(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  delete(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.delete(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  getFavEmp():Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/favs')
    let val = this.http.get(postUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    return val
  }
  list_rdv_emp () {
    return this.http.get<any>(`${this.rdvUrl}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
  }
  filtre_rdv_emp (datedebut:Date|null,datefin:Date|null,services:Service[]) {
    const postUrl = `${this.apiUrl}`.concat('/rdv/filtre')
    return this.http.post<RdvFull[]>(postUrl,{datedebut:datedebut,datefin:datefin,services:services}, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
  }
}
