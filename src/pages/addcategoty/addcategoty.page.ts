import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  
  return null;
}
export function ValidateString(control: AbstractControl) {
  let pattern = /[*\\/|":?><]/gi; // can change regex with your requirement
  //if validation fails, return error name & value of true
  if (pattern.test(control.value)) {
      return { validString: true };
  }
  //otherwise, if the validation passes, we simply return null
  return null;
}
@Component({
  selector: 'app-addcategoty',
  templateUrl: './addcategoty.page.html',
  styleUrls: ['./addcategoty.page.scss'],
})
export class AddcategotyPage implements OnInit {
  userData: any;
  hotelId;
  pageStatus;
  categoryDetail;
  categoryForm: FormGroup;
  param:any={};
  constructor(private modalCtrl: ModalController, public constant: Constant,
    public service: webServicenew, public fb: FormBuilder) {
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {
    // console.log(`${this.hotelId}`)
    // console.log(this.pageStatus);
    // console.log(this.categoryDetail);

    this.FormValtion();
    if (this.categoryDetail) {
      // this.categoryForm.value.catName = this.categoryDetail.category;
      // this.categoryForm.value.orderno = this.categoryDetail.viewOrder;
      this.categoryForm.setValue({
        catName: this.categoryDetail.category,
        orderno: this.categoryDetail.viewOrder
      })
    }
  }

  FormValtion() {
    this.categoryForm = this.fb.group({
      catName: ['', Validators.compose([Validators.required, removeSpaces])],
      orderno: ['', Validators.compose([Validators.required])],
    });
  
  }

  addEditCategory(form) {
    
    console.log(form.value);
    if (form.valid) {
      
      this.param.userId= this.userData.userId;
      this.param.hotelId= this.hotelId;
      this.param.category= form.value.catName;
      this.param.viewOrder= form.value.orderno;
      
      if (this.pageStatus == 'Add') {
        this.addCategory(this.param);
      }else if(this.pageStatus == 'Edit'){
        this.param.categoryId = this.categoryDetail.categoryId;
        this.editCategory(this.param);
      }
    } else {
      if(form.value.catName){
        if(form.value.orderno){

        }else{
          this.constant.ToastCustom('Please enter valid Order No. ', 'top');
        }
      }else{
        if(form.value.orderno){
          this.constant.ToastCustom('Please Enter Category Name', 'top');
        }else{
          this.constant.ToastCustom('Please Enter Category Name And Order No', 'top');
        }
      }
      
    }

  }

  addCategory(param) {
    //this.constant.LoadingPresent();
    this.service.addPMCategoryApi(param).subscribe(result => {
      //this.constant.LoadingHide();
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
        this.modalCtrl.dismiss({status:true});
      }else{
        this.constant.ToastCustom(result.message, 'top');
        // this.constant.LogoutSession(result.status_key);
      }
    });
  }

  editCategory(param) {
    //this.constant.LoadingPresent();
    this.service.editPMCategoryApi(param).subscribe(result => {
      //this.constant.LoadingHide();
      if (result) {
        this.constant.ToastCustom(result.message, 'top');
        this.modalCtrl.dismiss({status:true});
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

  closeModel() {
    // console.log('closeModel');
    this.modalCtrl.dismiss();
  }

}
