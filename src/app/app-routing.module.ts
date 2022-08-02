import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './views/Department/add-department/add-department.component';
import { ListDepartmentsComponent } from './views/Department/list-departments/list-departments.component';
import { ListDesignationsComponent } from './views/Designation/list-designations/list-designations.component';
import { AddEditEmployeeComponent } from './views/Employee/add-edit-employee/add-edit-employee.component';
// import { AddEmployeeComponent } from './views/Employee/add-employee/add-employee.component';
// import { EditEmployeeComponent } from './views/Employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './views/Employee/list-employee/list-employee.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  // {path: "add-employee", component: AddEmployeeComponent},
  // {path: "edits-employee/:id", component: EditEmployeeComponent},
  {path: "list-employees", component: ListEmployeeComponent},
  {path: "list-departments", component: ListDepartmentsComponent},
  {path: "list-designations", component: ListDesignationsComponent},
  {path: 'employee/:id', component: AddEditEmployeeComponent},
  {path: 'department/0', component: AddDepartmentComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
