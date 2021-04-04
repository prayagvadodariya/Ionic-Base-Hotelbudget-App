import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  itemForm: FormGroup;
  param:any={};
  userData: any;
  hotelId;
  categoryId;
  pageStatus;
  itemDetail:any;
  constructor(private modalCtrl: ModalController, public constant: Constant,
    public service: webServicenew, public fb: FormBuilder) {
      this.userData = this.constant.getUserData();
     }

  ngOnInit() {
    this.FormValtion();
    // console.log(`${this.hotelId}`)
    // console.log(this.categoryId);
    if (this.itemDetail) {
      this.itemForm.setValue({
        itemName  : this.itemDetail.item
      })
    }
  }

  FormValtion() {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-Z]')])]
    });
  }

  addEditItem(form) {
    
    // console.log(form.value);
    if (form.valid) {
      
      this.param.userId= this.userData.userId;
      this.param.hotelId= this.hotelId;
      this.param.categoryId= this.categoryId;
      this.param.item= form.value.itemName;
      
      if (this.pageStatus == 'Add') {
        this.addItem(this.param);
      }else if(this.pageStatus == 'Edit'){
        this.param.itemId = this.itemDetail.itemId;
        this.editItem(this.param);
      }
    } else {
      this.constant.ToastCustom('Please Enter Item Name', 'top');
    }

  }
  addItem(param) {
    //this.constant.LoadingPresent();
    this.service.addPMItemApi(param).subscribe(result => {
      //this.constant.LoadingHide();
      if (result) {
        this.constant.ToastCustom(result.message, 'top');
        this.modalCtrl.dismiss({status:true});
      }else{
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

  editItem(param) {
    //this.constant.LoadingPresent();
    this.service.editPMItemApi(param).subscribe(result => {
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
    this.modalCtrl.dismiss();
  }

}
