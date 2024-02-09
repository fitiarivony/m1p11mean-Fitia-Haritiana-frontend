import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:8000/genre'

  constructor (private http: HttpClient) {}

  getAll():Observable<any>{
    const postUrl = `${this.apiUrl}`
    let val = this.http.get(postUrl)
    return val
  }}
