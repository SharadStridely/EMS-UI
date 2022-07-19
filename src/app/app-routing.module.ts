import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentsComponent } from './views/Department/list-departments/list-departments.component';
import { ListDesignationsComponent } from './views/Designation/list-designations/list-designations.component';
import { AddEmployeeComponent } from './views/Employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './views/Employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './views/Employee/list-employee/list-employee.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "add-employee", component: AddEmployeeComponent},
  {path: "edit-employee", component: EditEmployeeComponent},
  {path: "list-employees", component: ListEmployeeComponent},
  {path: "list-departments", component: ListDepartmentsComponent},
  {path: "list-designations", component: ListDesignationsComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
