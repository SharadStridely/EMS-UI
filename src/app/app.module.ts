import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './views/Employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './views/Employee/list-employee/list-employee.component';
import { HomeComponent } from './views/home/home.component';
import { ListDepartmentsComponent } from './views/Department/list-departments/list-departments.component';
import { ListDesignationsComponent } from './views/Designation/list-designations/list-designations.component';
import { AddDepartmentComponent } from './views/Department/add-department/add-department.component';
import { AddDesignationComponent } from './views/Designation/add-designation/add-designation.component';
import { EditEmployeeComponent } from './views/Employee/edit-employee/edit-employee.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { AddEditEmployeeComponent } from './views/Employee/add-edit-employee/add-edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    HomeComponent,
    ListDepartmentsComponent,
    ListDesignationsComponent,
    AddDepartmentComponent,
    AddDesignationComponent,
    EditEmployeeComponent,
    NotFoundComponent,
    NotificationsComponent,
    AddEditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
