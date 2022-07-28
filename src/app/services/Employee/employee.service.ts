import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeURL: string = environment.EmployeeURL;

  getEmployeeList(){
    return this.http.get(this.employeeURL);
  }

  getEmployeeById(id: any){
    return this.http.get(this.employeeURL + "/" + id);
  }

  addEmployee(Employee: any){
    return this.http.post(this.employeeURL, Employee)
  // Post(repository, path, objModel, success, error, throwError?: any) {
  //   var fullURL = ''
  //   //this.getFullURL(repository, path);
  //   this.http
  //     .post(fullURL, JSON.stringify(objModel))
  //     .subscribe(function (result) {
  //       return success(result);
  //     }, (err) => {
  //       return err
  //     });
  // }
  }

  updateEmployee(id: number,Employee: any){
    return this.http.put(this.employeeURL + "/" + id, Employee);
  }

  deleteEmployee(id: number){
    return this.http.delete(this.employeeURL + "/" + id);
  }

}
