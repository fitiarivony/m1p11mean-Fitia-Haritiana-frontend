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
  listService() {
    let val = this.http.get<Service[]>('http://localhost:8000/services');
    return val;
  }
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>('http://localhost:8000/services', service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getServiceById(id: string) {
    return this.http.get<Service>('http://localhost:8000/services/' + id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
  updateService(service: Service) {
    return this.http.put<Service>('http://localhost:8000/services/'+service._id, service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  deleteService(_id: string){
    return this.http.delete('http://localhost:8000/services/'+_id,{headers:{
      Authorization: 'Bearer '+localStorage.getItem('token'),
    }});
  }
}
