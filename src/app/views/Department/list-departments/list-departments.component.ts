import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Depatment';
import { DepartmentService } from 'src/app/services/Department/department.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  Departments: any

  constructor(private departmentService: DepartmentService) {
   }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => this.Departments = departments)
  }

}
