import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = 'https://m1p11mean-fitia-haritiana-backend.onrender.com/rdv'
  constructor(private http: HttpClient) {}
  getAvgRdv (): Observable<any> {
    const postUrl = `${this.apiUrl}`.concat('/avg')
    let val = this.http.get(postUrl)
    return val
  }
}
