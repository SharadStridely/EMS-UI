import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  //#region globle declare
  Departments: any;
  Designations: any;
  Employee = new Employee();
  isAdding: boolean = false;
  isUpdating: boolean = false;
  errorMessage: any = null;
  paramKey: number;
  displayTitle: string;
  employeeForm: FormGroup;
  Hobbies = [
    { id: 1, name: 'Chess', isChecked: false },
    { id: 2, name: 'Cricket', isChecked: false },
    { id: 3, name: 'Reading', isChecked: false },
  ];
//#endregion

  constructor(private employeeService: EmployeeService, 
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService, 
    private designationService: DesignationService,
    private router: Router,
    public datePipe: DatePipe,
    private activatdRoute: ActivatedRoute,
    private notifyService: NotificationService) { }
 
  ngOnInit(): void {
    this.setFormBuilder();
    this.activatdRoute.paramMap.subscribe(res => this.paramKey = +res.get('id'));
    // this.paramKey = +this.activatdRoute.snapshot.params['id'];
    this.departmentService.getAll().subscribe(departments => this.Departments = departments);
    this.designationService.GetDesignationList().subscribe(designation => this.Designations = designation);
    if (this.paramKey == 0) {
      this.setAddForm();
    }
    else if (this.paramKey > 0) {
      this.employeeService.getEmployeeById(this.paramKey).subscribe({
        next:(employee) => {
        this.Employee = employee as Employee;
        this.Hobbies.forEach(hobbie => {
          if(this.Employee.hobbies.includes(hobbie.name))
            hobbie.isChecked = true;
        });
        console.log(this.Hobbies);
        this.setEditForm();
        },
        error:(err)=> {
          this.errorMessage = err.message; 
        }
      }); 
    }
  }

  setFormBuilder() {
    this.employeeForm = this.formBuilder.group({
      firstName:  ['', [Validators.required]],
      middleName:  [''],
      lastName: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      dob: [''],
      gender: [''],
      deptId: [''],
      desgnId: [''],
    });
  }

  setAddForm(){
    this.employeeForm.setValue({
      firstName: '',
      middleName: '',
      lastName: '',
      salary: 0,
      dob: '',
      gender: "1",
      deptId: 'Select',
      desgnId: 'Select'
    })
  }
  
  setEditForm(){
    this.employeeForm.setValue({
      firstName: this.Employee.firstName,
      middleName: this.Employee.middleName,
      lastName: this.Employee.lastName,
      salary: this.Employee.salary,
      dob: this.datePipe.transform(this.Employee.dob, 'yyyy-MM-dd'),
      gender: this.Employee.gender.toString(),
      deptId: this.Employee.deptId,
      desgnId: this.Employee.desgnId,
    });
     
  }

  setModelBeforeSubmit(){
    this.Employee.firstName = this.employeeForm.value.firstName,
    this.Employee.middleName = this.employeeForm.value.middleName,
    this.Employee.lastName = this.employeeForm.value.lastName,
    this.Employee.salary = +this.employeeForm.value.salary,
    this.Employee.dob = this.employeeForm.value.dob,
    this.Employee.gender = +this.employeeForm.value.gender,
    this.Employee.deptId = +this.employeeForm.value.deptId,
    this.Employee.desgnId = +this.employeeForm.value.desgnId,
    this.Employee.hobbies='';
    this.Hobbies.filter(hobbie => hobbie.isChecked == true).forEach((hobbie )=>{
     this.Employee.hobbies += hobbie.name +','
    })
    if( this.Employee.hobbies.includes(','))
    {
      this.Employee.hobbies = this.Employee.hobbies.slice(0, -1);
    }
    this.displayToastrError();
  }

  onSubmit() {
    this.setModelBeforeSubmit();
    if (this.paramKey == 0) {
      this.isAdding = true;
      this.employeeService.addEmployee(this.Employee).subscribe({
        complete:() => {
        this.router.navigateByUrl("list-employees");
        this.notifyService.showSuccess("Employee Added successfully !!", "myPortal");
      }, 
        error:(err) => {
        this.isAdding = false;
        this.errorMessage = err.message;
        }
      });
    }
    else if(this.paramKey > 0){
      this.isUpdating = true;
      this.employeeService.updateEmployee(this.Employee.employeeId ,this.Employee).subscribe({
        complete:() => {
        this.router.navigateByUrl("list-employees");
        this.notifyService.showSuccess("Employee updated successfully !!", "myPortal");
      },
        error:(err) => {
        // this.isUpdating = false;
        this.errorMessage = err.message;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['employee/0']);
        });
        this.notifyService.showError(this.errorMessage, "myPortal");
        }
      });
    }
  }
  
  onChangeHobbie(event: any, hobbieName: string){
    if (event.target.checked) {
      this.Hobbies.find(hobbie => hobbie.name == hobbieName).isChecked = true;
    }
    else {
      this.Hobbies.find(hobbie => hobbie.name == hobbieName).isChecked = false;
    }
  }

  displayFieldCss(field: string , ctrlType: string){
    if(ctrlType.toLowerCase() == "txt"){
      return {
        'plain-valid': this.employeeForm.get(field).valid,
        'is-invalid': (this.employeeForm.get(field).invalid && (this.employeeForm.get(field).dirty || this.employeeForm.get(field).touched))
      }
    }
    else{
      return {
        'plain-valid': this.employeeForm.get(field).valid,
        'plain-invalid': (this.employeeForm.get(field).invalid && (this.employeeForm.get(field).dirty || this.employeeForm.get(field).touched))
      };
    } 
  }

  displayToastrError(){
     if (this.employeeForm.value.firstName.trim() === '') {
      this.notifyService.showError('Please fill the FirstName field', 'Validation Alert!');
     }
     else if (this.employeeForm.value.lastName.trim() === '') {
      this.notifyService.showError('Please fill the LastName field', 'Validation Alert!');
     }
     else if (this.employeeForm.value.salary == null || this.employeeForm.value.salary == '0') {
      this.notifyService.showError('Please fill the Salary field', 'Validation Alert!');
     }
     else if (this.employeeForm.value.deptId == 'Select') {
      this.notifyService.showError('Please select the Department', 'Validation Alert!');
     }
     else if (this.employeeForm.value.desgnId == 'Select') {
      this.notifyService.showError('Please select the Designation', 'Validation Alert!');
     }
  }

}
