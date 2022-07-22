import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditEmployeeService } from 'src/app/services/Employee/edit-employee.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  
  Employees: any;
  isFetching: boolean = false;
  isDeleting: boolean = false;
  errorMessage: any = null;

  constructor(private employeeService: EmployeeService, private router: Router,private editEmployeeService: EditEmployeeService) {
    employeeService.getEmployeeList().subscribe(res => {
      this.isFetching = true;
      this.Employees = res;
    }, (err) => {
      this.errorMessage = err.message;
      this.isFetching = false;
    })
    
  }

  ngOnInit(): void {}


  onEdit(employeeId: any){
    this.editEmployeeService.editEmployee(employeeId);
    this.router.navigateByUrl('edits-employee');
  }


  onDelete(id: any){
    if(confirm("Are you sure") == true){
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.isDeleting = true
      },(err) => {
        this.errorMessage = err.message;
        this.isDeleting = false;
      });
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['list-employees']);
    });
      alert("Deleted Successfully");
    }

  }

}
