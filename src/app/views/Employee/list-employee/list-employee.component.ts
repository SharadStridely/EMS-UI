import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  
  Employees: any;

  constructor(private employeeService: EmployeeService, private router: Router) {
    employeeService.getEmployeeList().subscribe(res => this.Employees = res);
  }

  ngOnInit(): void {}

  onDelete(id: any){
    if(confirm("Are you sure") == true){
      this.employeeService.deleteEmployee(id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['list-employees']);
    });
      alert("Deleted Successfully");
    }

  }

}
