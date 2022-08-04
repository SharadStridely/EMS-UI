import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidator } from 'src/app/core/custom-validator';
import { Emsconst } from 'src/app/core/emsconst';
import { Employee } from 'src/app/models/Employee';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { DesignationService } from 'src/app/services/Designation/designation.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
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
  maxDate = new Date();
  displayMaxDate: any;
  Hobbies = [
    { id: 1, name: 'Chess', isChecked: false },
    { id: 2, name: 'Cricket', isChecked: false },
    { id: 3, name: 'Reading', isChecked: false },
    { id: 4, name: 'Flying', isChecked: false },
    { id: 5, name: 'Reels', isChecked: false },
    { id: 6, name: 'Maths', isChecked: false },
  ];
  //#endregion

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private router: Router,
    public datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.setFormBuilder();
    this.displayMaxDate =
      this.maxDate.getFullYear() -
      18 +
      '-' +
      this.maxDate.toISOString().slice(5, 10);
    this.activatedRoute.paramMap.subscribe(
      (res) => (this.paramKey = +res.get('id'))
    );
    // this.paramKey = +this.activatedRoute.snapshot.params['id'];
    this.departmentService
      .getAll()
      .subscribe((departments) => (this.Departments = departments));
    this.designationService
      .GetDesignationList()
      .subscribe((designation) => (this.Designations = designation));
    if (this.paramKey == 0) {
      this.setAddForm();
    } else if (this.paramKey > 0) {
      this.employeeService.getEmployeeById(this.paramKey).subscribe({
        next: (employee) => {
          this.Employee = employee as Employee;
          this.Hobbies.forEach((hobbie) => {
            if (this.Employee.hobbies.includes(hobbie.name))
              hobbie.isChecked = true;
          });
          this.setEditForm();
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

  setFormBuilder() {
    this.employeeForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          Validators.pattern(/^\S*$/),
          Validators.pattern(/^[A-Za-z0-9 ]+$/),
        ],
      ],
      middleName: [''],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          Validators.pattern(/^\S*$/),
          Validators.pattern(/^[A-Za-z0-9 ]+$/),
        ],
      ],
      salary: [
        '',
        [
          Validators.min(1),
          Validators.max(10000000),
          Validators.pattern(/^\d*\.?\d*$/),
        ],
      ],
      dob: ['', [Validators.required, CustomValidator.dateValidator]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.min(1)]],
      designation: ['', [Validators.min(1)]],
    });
  }

  setAddForm() {
    this.employeeForm.setValue({
      firstName: '',
      middleName: '',
      lastName: '',
      salary: 0,
      dob: '',
      gender: '1',
      department: 0,
      designation: 0,
    });
  }

  setEditForm() {
    this.employeeForm.setValue({
      firstName: this.Employee.firstName,
      middleName: this.Employee.middleName,
      lastName: this.Employee.lastName,
      salary: this.Employee.salary,
      dob: this.datePipe.transform(this.Employee.dob, 'yyyy-MM-dd'),
      gender: this.Employee.gender.toString(),
      department: this.Employee.deptId,
      designation: this.Employee.desgnId,
    });
  }

  setModelBeforeSubmit() {
    (this.Employee.firstName = this.employeeForm.value.firstName),
      (this.Employee.middleName = this.employeeForm.value.middleName),
      (this.Employee.lastName = this.employeeForm.value.lastName),
      (this.Employee.salary = +this.employeeForm.value.salary),
      (this.Employee.dob = this.employeeForm.value.dob),
      (this.Employee.gender = +this.employeeForm.value.gender),
      (this.Employee.deptId = +this.employeeForm.value.department),
      (this.Employee.desgnId = +this.employeeForm.value.designation),
      (this.Employee.hobbies = '');
    this.Hobbies.filter((hobbie) => hobbie.isChecked == true).forEach(
      (hobbie) => {
        this.Employee.hobbies += hobbie.name + ',';
      }
    );
    if (this.Employee.hobbies.includes(',')) {
      this.Employee.hobbies = this.Employee.hobbies.slice(0, -1);
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.Employee == this.employeeForm.value;
      this.displayToastrError();
    } else if (this.employeeForm.value.dob > this.displayMaxDate) {
      this.notifyService.showError(
        'Please select valid Date',
        Emsconst.validationTitile
      );
    } else {
      this.setModelBeforeSubmit();
      if (this.paramKey == 0) {
        this.isAdding = true;
        this.employeeService.addEmployee(this.Employee).subscribe({
          complete: () => {
            this.router.navigateByUrl('list-employees');
            this.notifyService.showSuccess(
              'Employee Added successfully !!',
              Emsconst.successTitile
            );
          },
          error: (err) => {
            this.isAdding = false;
            this.errorMessage = err.message;
            this.notifyService.showError(this.errorMessage, Emsconst.successTitile);
          },
        });
      } else if (this.paramKey > 0) {
        this.isUpdating = true;
        this.employeeService
          .updateEmployee(this.Employee.employeeId, this.Employee)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('list-employees');
              this.notifyService.showSuccess(
                'Employee updated successfully !!',
                Emsconst.successTitile
              );
            },
            error: (err) => {
              // this.isUpdating = false;
              this.errorMessage = err.message;
              this.notifyService.showError(this.errorMessage, Emsconst.successTitile);
            },
          });
      }
    }
  }

  onChangeHobbie(event: any, hobbieName: string) {
    if (event.target.checked) {
      this.Hobbies.find((hobbie) => hobbie.name == hobbieName).isChecked = true;
    } else {
      this.Hobbies.find((hobbie) => hobbie.name == hobbieName).isChecked =
        false;
    }
  }

  displayFieldCss(field: string, ctrlType: string) {
    if (ctrlType.toLowerCase() == 'txt') {
      return {
        'plain-valid': this.employeeForm.get(field).valid,
        'is-invalid':
          this.employeeForm.get(field).invalid &&
          (this.employeeForm.get(field).dirty ||
            this.employeeForm.get(field).touched),
      };
    } else {
      return {
        'plain-valid': this.employeeForm.get(field).valid,
        'plain-invalid':
          this.employeeForm.get(field).invalid &&
          (this.employeeForm.get(field).dirty ||
            this.employeeForm.get(field).touched),
      };
    }
  }

  displayToastrError() {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (
      this.employeeForm.get('firstName').invalid &&
      this.employeeForm.value.firstName.trim() == ''
    ) {
      this.notifyService.showError(
        'Please fill the FirstName field',
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('firstName').invalid &&
      this.employeeForm.value.firstName.match(specialChars)
    ) {
      this.notifyService.showError(
        "FirstName doesn't contain special character",
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('lastName').invalid &&
      this.employeeForm.value.lastName.trim() == ''
    ) {
      this.notifyService.showError(
        'Please fill the LastName field',
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('lastName').invalid &&
      this.employeeForm.value.lastName.match(specialChars)
    ) {
      this.notifyService.showError(
        "LastName doesn't contain special character",
        Emsconst.validationTitile
      );
    } else if (this.employeeForm.get('salary').invalid) {
      this.notifyService.showError(
        'Please fill the Salary field',
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('dob').invalid &&
      this.employeeForm.value.dob.trim() == ''
    ) {
      this.notifyService.showError(
        'Please select the Date field',
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('dob').invalid &&
      this.employeeForm.value.dob > this.displayMaxDate
    ) {
      this.notifyService.showError(
        'Date of birth should be less then ' + this.displayMaxDate.split("-").reverse().join("-"),
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('department').invalid &&
      this.employeeForm.value.department == 0
    ) {
      this.notifyService.showError(
        'Please select the Department',
        Emsconst.validationTitile
      );
    } else if (
      this.employeeForm.get('designation').invalid &&
      this.employeeForm.value.designation == 0
    ) {
      this.notifyService.showError(
        'Please select the Designation',
        Emsconst.validationTitile
      );
    }
  }

  //validation of Date
  // displayDOBCss(field: string){
  //   return{
  //     'plain-valid' : this.employeeForm.get(field).value <= this.displayMaxDate,
  //     'is-invalid': this.employeeForm.get(field).value > this.displayMaxDate
  //   }
  // }

  // displayToastrError(ctrl: any) {
  //    for (let key in ctrl) {
  //     if (this.employeeForm.get(key).invalid) {
  //       this.notifyService.showError('Please fill the ' + key.toLowerCase() + ' field', Emsconst.validationTitile);
  //       return
  //     }
  //   }
  // }
}
