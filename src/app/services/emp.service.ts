import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Employe, FormEmploye, Genre, Login } from '../model'
@Injectable({
  providedIn: 'root'
})

export class EmpService {
  private apiUrl = 'http://localhost:8000/emp'
  constructor (private http: HttpClient) {}

  postData (data: Login): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/login')
    let val = this.http.post(postUrl, data)
    return val
  }
  getAll (): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.get(postUrl)
    return val
  }
  inscription (data: FormEmploye): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.post(postUrl, data)
    return val
  }
  update (data: FormEmploye, id:string): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.put(postUrl, data)
    return val
  }
  getOne(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.get(postUrl)
    return val
  }
  delete(id:string):Observable<any>{
    const postUrl = `${this.apiUrl}`.concat('/').concat(id)
    let val = this.http.delete(postUrl)
    return val
  }

}
