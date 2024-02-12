import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}
  createClient(client:Client){
    return this.http.post<Client>('http://localhost:8000/clients/sign-up',client,{headers: {'Content-Type': 'application/json'}});
  }
  loginClient(client:Client){
    return this.http.post('http://localhost:8000/clients/sign-in',client,{headers: {'Content-Type': 'application/json'}});
  }
}
