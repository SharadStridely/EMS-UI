import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(
   // private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  // showToasterSuccess(){
  //   this.toastr.success("Data shown successfully !!", "Data shown successfully !!")
  // }
   
  // showToasterError(){
  //   this.toastr.error("Something is wrong", "Something is wrong")
  // }
   
  // showToasterInfo(){
  //   this.toastr.info("This is info", "This is info")
  // }
   
  // showToasterWarning(){
  //   this.toastr.warning("This is warning", "This is warning")
  // }

}
