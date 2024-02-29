import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Login } from '../model'

@Injectable({
  providedIn: 'root'
})
export class LoginEmpService {
  private apiUrl = 'https://m1p11mean-fitia-haritiana-backend.onrender.com/emp/login'

  constructor (private http: HttpClient) {}

  postData (data: Login): Observable<any> {
    const postUrl = `${this.apiUrl}`
    let val = this.http.post(postUrl, data)
    return val
  }
}
