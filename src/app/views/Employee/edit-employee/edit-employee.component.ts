import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EditEmployeeService } from 'src/app/services/Employee/edit-employee.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  //#region Globle Declare
  Departments: any;
  Designations: any;
  Employee: any;
  EmployeeId: any;
  errorMessage: any = null;
  isUpdating: boolean = false;
  Hobbies = [
    { id: 1, name: 'Chess', isChecked: false },
    { id: 2, name: 'Cricket', isChecked: false },
    { id: 3, name: 'Reading', isChecked: false },
  ];
  //#endregion

  constructor(private employeeService: EmployeeService, 
    private departmentService: DepartmentService, 
    private designationService: DesignationService,
    private editEmployeeService: EditEmployeeService,
    private router: Router,
    public datePipe: DatePipe) { }
  
    updateEmployee = new FormGroup({
      employeeId: new FormControl(),
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
    this.departmentService.getAll().subscribe(departments => this.Departments = departments);
    this.designationService.GetDesignationList().subscribe(designation => this.Designations = designation);
    this.EmployeeId = this.editEmployeeService.EmployeeId;
    this.employeeService.getEmployeeById(this.EmployeeId).subscribe(employee => {
      this.Employee = employee;
      this.setEmployeeValue();
    }); 
  }

  setValueBeforeSubmit(){
    this.updateEmployee.value.hobbies = this.updateEmployee.value.hobbies?.toString();
    this.updateEmployee.value.gender = Number(this.updateEmployee.value.gender);
    this.updateEmployee.value.deptId = Number(this.updateEmployee.value.deptId);
    this.updateEmployee.value.desgnId = Number(this.updateEmployee.value.desgnId);
  }

  onSubmit(){
    this.setValueBeforeSubmit();
    this.employeeService.updateEmployee(this.updateEmployee.value.employeeId, this.updateEmployee.value).subscribe(() => {
      this.isUpdating = true;
      alert("Employee Updated Successfully");
      this.router.navigateByUrl("list-employees");
    },
    (err) => {
      this.errorMessage = err.message;
    });
  }

  onChange(event: any){
    const Hobbies: FormArray = this.updateEmployee.get('hobbies') as FormArray;

    if (event.target.checked) {
      this.Hobbies[event.target].isChecked = true;
      Hobbies.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      Hobbies.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          this.Hobbies[event.target].isChecked = false;
          Hobbies.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

  setEmployeeValue(){
    this.updateEmployee.setValue({
      employeeId: this.Employee.employeeId,
      firstName: this.Employee.firstName,
      middleName: this.Employee.middleName,
      lastName: this.Employee.lastName,
      salary: this.Employee.salary,
      dob: this.datePipe.transform(this.Employee.dob, 'yyyy-MM-dd'),
      gender: this.Employee.gender.toString(),
      deptId: this.Employee.deptId,
      desgnId: this.Employee.desgnId,
      hobbies: this.Employee.hobbies,
    });    
  }

}
