import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  departmentURL: string = environment.DepartmentURL;

  getAll(){
    return this.http.get(this.departmentURL);
  }

}
