import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  Hobbies = [
    { id: 1, name: 'Chess' },
    { id: 2, name: 'Cricket' },
    { id: 3, name: 'Reading' },
  ];

  Departments: any;
  Designations: any;

  constructor(private employeeService: EmployeeService, 
    private departmentService: DepartmentService, 
    private designationService: DesignationService,
    private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => this.Departments = departments)
    this.designationService.GetDesignationList().subscribe(designation => this.Designations = designation)
  }

  updateEmployee = new FormGroup({
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

  onSubmit(updateEmployee: FormGroup){
    updateEmployee.value.hobbies = String(updateEmployee.value.hobbies);
    updateEmployee.value.deptId = Number(updateEmployee.value.deptId);  
    updateEmployee.value.desgnId = Number(updateEmployee.value.desgnId);  
    updateEmployee.value.gender = Number(updateEmployee.value.gender);  
    this.employeeService.updateEmployee(updateEmployee.value);
    alert("Employee Added Successfully");
    this.router.navigateByUrl("list-employees");
  }

  onChange(event: any){
    const Hobbies: FormArray = this.updateEmployee.get('hobbies') as FormArray;

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
