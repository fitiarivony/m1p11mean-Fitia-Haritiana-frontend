import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormOffre, Offre } from '../model';

@Injectable({
  providedIn: 'root'
})
export class OffreSpecialeService {

  private apiUrl = 'http://localhost:8000/offres'
  constructor(private http: HttpClient) { }
  getAll (): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.get(postUrl)
    return val
  }
  post (data: FormOffre): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.post(postUrl, data)
    return val
  }
  update (data: FormOffre, id:string): Observable<any> {
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
