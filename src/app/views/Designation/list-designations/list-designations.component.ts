import { Component, OnInit } from '@angular/core';
import { DesignationService } from 'src/app/services/Designation/designation.service';

@Component({
  selector: 'app-list-designations',
  templateUrl: './list-designations.component.html',
  styleUrls: ['./list-designations.component.css']
})
export class ListDesignationsComponent implements OnInit {

  Designations: any =[];

  constructor(private designationService: DesignationService) {
    designationService.GetDesignationList().subscribe(designations => this.Designations = designations)    
   }

  ngOnInit(): void {
  }

}
