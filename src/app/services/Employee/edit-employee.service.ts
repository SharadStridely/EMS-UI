import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EditEmployeeService {

  EmployeeId: any;

  constructor(private employeeService: EmployeeService) { }

  editEmployee(employeeId: any){
    this.EmployeeId = employeeId;
  }

}
