import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constant } from 'src/services/constant';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  department_data: any = [];
  dabel_month_year: any;
  data: any;
  hotel_Name: any;
  userData: any;
  hoteloriginal_id: any;


  constructor(public events: Events, private router: Router, public constant: Constant) {
   this.data= JSON.parse(localStorage.getItem("department_data"));
  //  console.log('dashboard_data', this.data );
   this.dabel_month_year = this.data.data.label;
   this.hotel_Name = this.data.data.hotel_name;
   this.department_data = this.data.data.department_data;
   this.userData = this.constant.getUserData();
   if(this.userData.roleId == 1){
    this.hoteloriginal_id = this.constant.HotelId;
   }else if(this.userData.roleId == 2){
    this.hoteloriginal_id = this.userData.hotelId;
   }
   }
   getDeptExpense(dept){
    // console.log("deptd",dept);
    this.router.navigate(['/expenseCategories', { deptData: JSON.stringify(dept),
    hotelname: JSON.stringify(this.data.data.hotel_name),
    hoteloriginal_id: JSON.stringify(this.hoteloriginal_id)}]);
    // console.log("hid",this.hoteloriginal_id);
   }

  ngOnInit() { 
  }
}
