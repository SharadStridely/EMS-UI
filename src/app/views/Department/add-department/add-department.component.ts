import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/Department/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  department: any

  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }


  setFormBuilder(){
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', [Validators.required]]
    })
  }
  setAddForm(){
    this.departmentForm.setValue({
      departmentName: ''
    })
  }

  onSubmit(){
    if(this.departmentForm.valid){
      this.department = this.departmentForm.value;
    }
    else{
      this.departmentService.addDepartment(this.department);
    }
  }

  displayFieldCss(field: string , ctrlType: string){
    if(ctrlType.toLowerCase() == "txt"){
      return {
        'plain-valid': this.departmentForm.get(field).valid,
        'is-invalid': (this.departmentForm.get(field).invalid && (this.departmentForm.get(field).dirty || this.departmentForm.get(field).touched))
      }
    }
    else{
      return {
        'plain-valid': this.departmentForm.get(field).valid,
        'plain-invalid': (this.departmentForm.get(field).invalid && (this.departmentForm.get(field).dirty || this.departmentForm.get(field).touched))
      };
    } 
  }

}
