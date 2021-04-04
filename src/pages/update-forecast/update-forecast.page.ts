import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
import { FormBuilder, Validators, FormGroup ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-update-forecast',
  templateUrl: './update-forecast.page.html',
  styleUrls: ['./update-forecast.page.scss'],
})
export class UpdateForecastPage implements OnInit {
  todaydate: any;
  date: any;
  userData: any;
  // forecastForm: FormGroup;
  getbudgetforcastdata:any;
  hotelId: any;
  hotelName: any;

  constructor(public constant: Constant, public service: webServicenew, public fb: FormBuilder) { 
    this.userData = this.constant.getUserData();
    this.todaydate = new Date().toISOString();
    this.date = this.constant.dateFormat(this.todaydate);
    // this.validationmsg();
    if(this.userData.roleId == 1){
      this.hotelId =  this.constant.HotelId;
      this.hotelName = this.constant.hotelName;
    }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.hotelName = this.constant.capitalHotelName
    }
    this.getForcastData();
  }
  validationmsg(){
    // this.forecastForm = this.fb.group({
    //   forecasted: ['', Validators.compose([Validators.required])],
    // });

  }

  ngOnInit() {
   
  }

  changeFromDate(val){
    this.date = this.constant.dateFormat(val.detail.value);
    // console.log("date",this.date);
    this.getForcastData();

  }
  update(val){
  // console.log("button index",val)
  }


  getForcastData(){
   
    let dic = {
    userId: this.userData.userId,
    hotelId: this.hotelId,
    date: this.date,
    
  };
  // console.log(dic);
    // this.constant.LoadingPresent();
    this.service.getBudgetForcastApi(dic).subscribe((result) => {
      // this.constant.LoadingHide();
      // console.log("1",result);
      if (result.status) {
        this.getbudgetforcastdata = result.data.data.budgetNForcastArr;
        this.createForm()
        // console.log("data",this.getbudgetforcastdata);
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }


  updateForecast(data,budgetForcastId){
    // console.log("1",data)
    console.log(data.forcastedOccupancy);
    console.log(data);
    if(data.forcastedOccupancy){
      let dic = {
        userId: this.userData.userId,
        hotelId: this.hotelId,
        budgetForcastId: data.budgetForcastId,
        budgetOccupancy: data.budgetOccupancy,
        forcastedOccupancy: data.forcastedOccupancy,
        departmentBudgetAllocationId: data.departmentBudgetAllocationId,
        date: this.date,
        
      };
      // console.log(dic);
        this.constant.LoadingPresent();
        this.service.saveForcastApi(dic).subscribe((result) => {
          this.constant.LoadingHide();
          // console.log("1",result);
          if (result.status) {
            // this.getbudgetforcastdata = result.data.data.budgetNForcastArr;
            this.createForm()
            // console.log("data",this.getbudgetforcastdata);
            this.constant.ToastCustom(result.message, 'top');
          } else {
            this.constant.ToastCustom(result.message, 'top');
            this.constant.LogoutSession(result.status_key);
          }
        }, error => {
          this.constant.Logout(error);
        });
    }else{
      this.constant.ToastCustom("Please Enter "+data.budgetForcastName+" Forecasted", 'top');
    }
  }

  createForm(){
    // this.forecastForm = this.fb.group({
    //   forecasted: ['', Validators.compose([Validators.required])],
    // });

    // this.forecastForm =   new FormGroup({});

    // let QuestionFormList: any = {};
    // for(var i=0;i<this.getbudgetforcastdata.length;i++){
    //   QuestionFormList[i] = new FormControl('', [Validators.required]);
    // }
    // this.getbudgetforcastdata.forEach(element => {
        
    // });

    // this.forecastForm = this.fb.group(QuestionFormList);
    // console.log(this.forecastForm)

  }

  // isFieldValid(field: string) {
  //   return !this.forecastForm.controls[field].valid && this.forecastForm.controls[field].touched && this.forecastForm.controls[field].errors.required;
  // }
  
}
