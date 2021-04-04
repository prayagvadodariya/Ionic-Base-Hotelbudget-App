import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {
  roomForm: FormGroup;
  param:any={};
  userData: any;
  hotelId;
  roomDetail:any;
  pageStatus;
  
  constructor(private modalCtrl: ModalController, public constant: Constant,
    public service: webServicenew, public fb: FormBuilder) {
      this.userData = this.constant.getUserData();
     }

     ngOnInit() {
      this.FormValtion();
      // console.log(`${this.hotelId}`)
      // console.log(this.roomDetail);
      if (this.roomDetail) {
        this.roomForm.setValue({
          room  : this.roomDetail.room
        })
      }
    }
  
    FormValtion() {
      this.roomForm = this.fb.group({
        room: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{1,100}$')])]
      });
    }

    addEditRoom(form){
      // console.log(form.value);
      if (form.valid) {
        
        this.param.userId= this.userData.userId;
        this.param.hotelId= this.hotelId;
        this.param.room= form.value.room;

        if (this.pageStatus == 'Add') {
          this.param.roleId= this.userData.roleId
          this.addRoom(this.param);
        }else if(this.pageStatus == 'Edit'){
          this.param.roomId = this.roomDetail.roomId;
          this.editRoom(this.param);
        }
      } else {
        this.constant.ToastCustom('Room is required.', 'top');
      }
  
    }

    addRoom(param) {
      //this.constant.LoadingPresent();
      this.service.addRoomAPI(param).subscribe(result => {
        //this.constant.LoadingHide();
        if (result.status) {
          this.constant.ToastCustom(result.message, 'top');
          this.modalCtrl.dismiss({status:true});
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      });
    }

    editRoom(param) {
      //this.constant.LoadingPresent();
      this.service.editRoomAPI(param).subscribe(result => {
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
