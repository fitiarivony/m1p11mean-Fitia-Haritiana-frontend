import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http: HttpClient) {}
  private apiUrl='http://localhost:8000/depense';
  listDepense() {
    let val = this.http.get<Depense[]>(`${this.apiUrl}`);
    return val;
  }
  createDepense(service: Depense): Observable<Depense> {
    return this.http.post<Depense>(`${this.apiUrl}`, service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getDepenseById(id: string) {
    return this.http.get<any>(`${this.apiUrl}`.concat('/' + id), {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
  }
  updateDepense(service: Depense) {
    return this.http.put<Depense>(`${this.apiUrl}`.concat('/'+service._id), service, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  deleteDepense(_id: string){
    return this.http.delete(`${this.apiUrl}`.concat('/'+_id),{headers:{
      Authorization: 'Bearer '+localStorage.getItem('token'),
    }});
  }
}
