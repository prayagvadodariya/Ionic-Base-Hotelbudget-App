import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, ModalController, MenuController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-capital-expense-cat',
  templateUrl: './capital-expense-cat.page.html',
  styleUrls: ['./capital-expense-cat.page.scss'],
})
export class CapitalExpenseCatPage implements OnInit {
  ExpenseForm: FormGroup;
  account_name: any;
  account_no: any;
  isCheckEmptyField = false;
  userData:any;
  hotelId:any;
  dataform: any = [];
  constructor(public modelCtrl: ModalController,public fb: FormBuilder,public navParams: NavParams,public constant: Constant, public service: webServicenew) {
    this.userData = this.constant.getUserData();
    this.FormValtion();

    if(this.userData.roleId == 1){
      this.hotelId= navParams.get("hotelId");
     }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
     }
   
   }

  ngOnInit() {
  }

  FormValtion() {
    this.ExpenseForm = this.fb.group({
      acountNo: ['', Validators.compose([Validators.pattern('^[0-9]{1,100}$'), Validators.required, this.noWhitespaceValidator])],
      acountName: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required, this.noWhitespaceValidator])],
    })
  }
  public noWhitespaceValidator(control: FormControl) {
    // console.log(control);
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  
  modelClose() {
    this.modelCtrl.dismiss();
  }
  // expenseSubmit() {
  //   let checkValid = false;
  //   if (this.account_no == null || this.account_no == "") {
  //     checkValid = true;
  //   }
  //   if (this.account_name == null || this.account_name == "") {
  //     checkValid = true;
  //   }
  //   if (checkValid) {
  //     // console.log(checkValid);
  //     return 0;
  //   }
  //   else {
  //     // console.log(checkValid);
  //     return 1;
  //   }
  // }
  accountAddClick(val) {
    // console.log(val);
     let dic = {
      userId:this.userData.userId,
      hotelId:this.hotelId,
      expenseAccountName:val.acountName,
      expenseAccountNumber: val.acountNo,
      createdByUserId:this.userData.userId,
     };
     
       this.constant.LoadingPresent();
       this.service.AddCapitalExpenseAccountAPI(dic).subscribe((result) => {
          this.constant.LoadingHide();
         if (result.status) {
          this.modelCtrl.dismiss();
            this.constant.ToastCustom(result.message, 'top');
         } else {
          this.constant.LogoutSession(result.status_key);
           this.constant.ToastCustom(result.message, 'top');
         }
       }, error => {
         this.constant.Logout(error);
       });
    }
    
}
