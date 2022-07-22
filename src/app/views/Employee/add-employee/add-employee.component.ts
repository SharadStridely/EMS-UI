import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  Hobbies = [
    { id: 1, name: 'Chess' },
    { id: 2, name: 'Cricket' },
    { id: 3, name: 'Reading' },
  ];

  Departments: any;
  Designations: any;
  Employee: any = new Employee();
  isAdding: boolean = false;
  errorMessage: any = null;

  constructor(private employeeService: EmployeeService, 
    private departmentService: DepartmentService, 
    private designationService: DesignationService,
    private router: Router) {}

  employee = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl(),
    lastName: new FormControl(),
    salary: new FormControl(),
    dob: new FormControl(),
    gender: new FormControl(),
    deptId: new FormControl(),
    desgnId: new FormControl(),
    hobbies: new FormArray([])
  });

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => this.Departments = departments)
    this.designationService.GetDesignationList().subscribe(designation => this.Designations = designation)
  }

  onSubmit(employee: any) {
    this.isAdding = true;
    employee.value.hobbies = String(employee.value.hobbies);
    employee.value.deptId = Number(employee.value.deptId);  
    employee.value.desgnId = Number(employee.value.desgnId);  
    employee.value.gender = Number(employee.value.gender);  
    this.employeeService.addEmployee(employee.value).subscribe(() => {
      this.isAdding = true;
      alert("Employee Added Successfully");
      this.router.navigateByUrl("list-employees");
    }, (err) => {
      this.isAdding = false;
      this.errorMessage = err.message;
    });
  }

  onChange(event: any){
    const Hobbies: FormArray = this.employee.get('hobbies') as FormArray;

    if (event.target.checked) {
      Hobbies.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      Hobbies.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          Hobbies.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

}
