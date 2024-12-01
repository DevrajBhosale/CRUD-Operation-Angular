import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionsService {

  constructor(public httpClient: HttpClient) { }

  baseUrl = 'http://localhost:8082/employee'

  httpHeaders = new HttpHeaders();
  options = {
    headers: this.httpHeaders
  };

  getAllEmpDetails(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/get");
  }

  createEmployee(form: any): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.options = {
      headers: this.httpHeaders
    };
    return this.httpClient.post<any>(this.baseUrl + "/create", JSON.stringify(form),this.options);
  }

  updateEmployee(form: any): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.options = {
      headers: this.httpHeaders
    };
    return this.httpClient.put<any>(this.baseUrl + "/update", JSON.stringify(form),this.options);
  }

  deleteEmployee(form: any): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.options = {
      headers: this.httpHeaders
    };
    return this.httpClient.post<any>(this.baseUrl + "/delete", JSON.stringify(form),this.options);
  }
}
