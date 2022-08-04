import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Emsconst } from 'src/app/core/emsconst';
import { EditEmployeeService } from 'src/app/services/Employee/edit-employee.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
declare const $: any;

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  //#region globle declare
  Employees: any;
  isFetching: boolean;
  isDeleting: boolean;
  errorMessage: any = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  //#endregion

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private editEmployeeService: EditEmployeeService,
    private notifyService : NotificationService
  ) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength : 5,
      lengthMenu : [5,10,15],
      processing : true
    };
    this.employeeService.getEmployeeList().subscribe({
      next:(res) => {
        this.isFetching = true;
        this.Employees = res;
        this.dtTrigger.next(this.Employees);
      },
      error:(err) => {
        this.errorMessage = err.message;
        this.isFetching = false;
        this.notifyService.showError(this.errorMessage, Emsconst.validationTitile);
      }
    });
  //  $('empList').DataTables();
 
  }

  onDelete(id: any) {
    if (confirm('Are you sure') == true) {
      this.employeeService.deleteEmployee(id).subscribe({
        complete:() => {
          this.isDeleting = true;
          this.notifyService.showSuccess("Employee Deleted Successfully", Emsconst.successTitile);
        },
        error:(err) => {
          this.errorMessage = err.message;
          this.isDeleting = false;
          this.notifyService.showError(this.errorMessage, Emsconst.validationTitile)
        }}
      );
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['list-employees']);
      });
      
    }
  }
}
