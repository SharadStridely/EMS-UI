import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EditEmployeeService } from 'src/app/services/Employee/edit-employee.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  Departments: any;
  Designations: any;
  Employee: any = new Employee();
  isAdding: boolean = false;
  isUpdating: boolean = false;
  errorMessage: any = null;
  Hobbies = [
    { id: 1, name: 'Chess' },
    { id: 2, name: 'Cricket' },
    { id: 3, name: 'Reading' },
  ];

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

  constructor(private employeeService: EmployeeService, 
    private departmentService: DepartmentService, 
    private designationService: DesignationService,
    private editEmployeeService: EditEmployeeService,
    private router: Router,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => this.Departments = departments)
    this.designationService.GetDesignationList().subscribe(designation => this.Designations = designation)
    if (this.isUpdating) {
      this.employeeService.getEmployeeById(this.editEmployeeService.EmployeeId).subscribe(employee => {
        this.Employee = employee;
        // this.setEmployeeValue();
      }); 
    }
  }

  setModelBeforeSubmit(){
    this.Employee.firstName = this.employee.value.firstName,
    this.Employee.middleName = this.employee.value.middleName,
    this.Employee.lastName = String(this.employee.value.lastName),
    this.Employee.salary = +this.employee.value.salary,
    this.Employee.dob = this.employee.value.dob,
    this.Employee.hobbies = String(this.employee.value.hobbies),
    this.Employee.deptId = +this.employee.value.deptId,
    this.Employee.desgnId = +this.employee.value.desgnId
  }

  onSubmit() {
    this.setModelBeforeSubmit();
    if (!this.isAdding) {
      this.employeeService.addEmployee(this.Employee).subscribe(() => {
        this.isAdding = true;
        alert("Employee Added Successfully");
        this.router.navigateByUrl("list-employees");
      }, (err) => {
        this.isAdding = false;
        this.errorMessage = err.message;
      });
    }
    else if(this.isUpdating){
      this.setModelBeforeSubmit();
      this.employeeService.updateEmployee(this.Employee.employeeId ,this.Employee).subscribe(() => {
        this.isUpdating = true;
        alert("Employee Updated Successfully");
        this.router.navigateByUrl("list-employees");
      },
      (err) => {
        this.errorMessage = err.message;
      });
    }

  }

  onChange(event: any){

  }


  
  // setEmployeeValue(){
  //   this.employee.setValue({
  //     employeeId: this.Employee.employeeId,
  //     firstName: this.Employee.firstName,
  //     middleName: this.Employee.middleName,
  //     lastName: this.Employee.lastName,
  //     salary: this.Employee.salary,
  //     dob: this.datePipe.transform(this.Employee.dob, 'yyyy-MM-dd'),
  //     gender: this.Employee.gender.toString(),
  //     deptId: this.Employee.deptId,
  //     desgnId: this.Employee.desgnId,
  //     hobbies: this.Employee.hobbies,
  //   });    
  // }


}
