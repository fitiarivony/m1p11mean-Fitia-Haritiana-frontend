import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../interfaces/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServeService {
  constructor(private http: HttpClient) {}
  services: Service[] | [] = [];
  private apiUrl='http://localhost:8000/services';
  listService() {
    let val = this.http.get<Service[]>(`${this.apiUrl}`);
    return val;
  }
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}`, service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getServiceById(id: string) {
    return this.http.get<Service>(`${this.apiUrl}`.concat('/' + id), {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
  updateService(service: Service) {
    return this.http.put<Service>(`${this.apiUrl}`.concat('/'+service._id), service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  deleteService(_id: string){
    return this.http.delete(`${this.apiUrl}`.concat('/'+_id),{headers:{
      Authorization: 'Bearer '+localStorage.getItem('token'),
    }});
  }
}
