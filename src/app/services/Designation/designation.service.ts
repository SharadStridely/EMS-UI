import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  designationURL: string = environment.DesignationURL;

  constructor(private http: HttpClient) { }

  GetDesignationList(){
    return this.http.get(this.designationURL);
  }

}
