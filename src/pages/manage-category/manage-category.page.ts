import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { AddcategotyPage } from '../addcategoty/addcategoty.page'
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.page.html',
  styleUrls: ['./manage-category.page.scss'],
})

export class ManageCategoryPage implements OnInit {
  userData: any;
  hotelList: any = [];
  reqparam = { hotelId: 0, roleId: 0, userId: 0, page: 0 };
  categoryList: any = [];
  infiniteScrollEnable = true;
  hotelName: any;
  message: any;
  message_title: any;
  
  constructor(public alertCtrl: AlertController, private router: Router , private modalCtrl: ModalController, public constant: Constant,
    public service: webServicenew, public actionSheetController: ActionSheetController) {
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {
    // this.hotelList = JSON.parse(localStorage.getItem("HotelList"));
    // if (this.constant.HotelId) {
    //   this.reqparam.hotelId = this.constant.HotelId;
    // } else {
    //   this.reqparam.hotelId = this.hotelList[0].hotelId;
    // }
    if(this.userData.roleId==1){
     
      if(this.constant.HotelId==0){
        this.hotelList = JSON.parse(localStorage.getItem("HotelList"));
        this.hotelName  =this.hotelList[0].hotelName;
        this.reqparam.hotelId = this.hotelList[0].hotelId; 
        // console.log("static");
      }else if(this.constant.HotelId!=0){
        this.hotelName = this.constant.hotelName;
        this.reqparam.hotelId = this.constant.HotelId;
        this.hotelList = JSON.parse(localStorage.getItem("HotelList"));
        // console.log("not static");
      }
    }else if (this.userData.roleId==2){
     this.hotelName = this.constant.capitalHotelName;
     this.reqparam.hotelId = this.userData.hotelId;
    //  console.log(this.hotelName);
    }else if (this.userData.roleId==6){
     this.hotelName = this.constant.hotelName;
     this.reqparam.hotelId = this.userData.hotelId;
    //  console.log(this.hotelName);
    }
    this.reqparam.roleId = this.userData.roleId;
    this.reqparam.userId = this.userData.userId;
    this.getCategoryList();
  }

  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }

  getCategoryList() {
    this.constant.LoadingPresent();
    this.service.getPMCategoryListAPI(this.reqparam).subscribe(
      result => {
        this.constant.LoadingHide();
        if (result.status) {
          this.message = result.setting.message;
          this.message_title = result.setting.message_title;
          this.categoryList = result.data.categoryListArr;
          for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].status === "1") {
              this.categoryList[i].catStatus = true;
            } else {
              this.categoryList[i].catStatus = false;
            }
          }
          // this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
          this.categoryList=[];
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  changeHotel(eve) {
    const index = this.hotelList.findIndex(p => p.hotelId === eve.detail.value);
    this.reqparam.page = 0;
    this.infiniteScrollEnable = true;
    this.hotelName = this.hotelList[index].hotelName;
    this.reqparam.hotelId = eve.detail.value;
    // console.log("->>>",eve);

    //  console.log("1",this.hotelList[index].hotelName);    

    this.getCategoryList();
  }

  InfinitScrollingProject(infiniteScroll: any) {
    // console.log(this.infiniteScrollEnable);
    if (this.categoryList.length > 0) {
      this.reqparam.page += 10;
    }
    let responseData;
    this.service.getPMCategoryListAPI(this.reqparam).subscribe((result) => {
      // console.log(result)
      infiniteScroll.target.complete();
      if (result.status) {
        responseData = result.data.categoryListArr;
        // console.log(responseData)
        for (let index = 0; index < responseData.length; index++) {

          if (responseData[index].status === "1") {
            responseData[index].catStatus = true;
          } else {
            responseData[index].catStatus = false;
          }
          this.categoryList.push(responseData[index]);
        }
        // this.constant.ToastCustom(result.message, 'top');
      }
      else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      if (responseData.length < 10) {
        this.infiniteScrollEnable = false;
      }
      else {
        this.infiniteScrollEnable = true;
      }
    }, (error) => {
      this.constant.Logout(error);
    });
  }


  async onAddCategory() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddcategotyPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId, pageStatus: 'Add' }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getCategoryList();
      }

    });
    return await modal.present();

  }



  async activeDeactiveCategory(category) {
    // console.log(category);
    if (category.catStatus == true) {
      var message = 'Do you wish to activate this category?';
    } else {
      // tslint:disable-next-line: prefer-const
      var message = 'Do you wish to deactivate this category?';
    }
    const alert = await this.alertCtrl.create({
      header: "Alert",
      cssClass: "add-item-alert roomadd activepopup",
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: 'icon-cancel',
          handler: () => {
            if (category.catStatus == false) {
              category.catStatus = true;
            } else {
              category.catStatus = false;
            }
          }
        },
        {
          text: "yes",
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.changeCategoryStatus(category);
          }
        }
      ]
    });
    return await alert.present();
  }

  changeCategoryStatus(category) {
    var status;
    if (category.catStatus == false) {
      status = 0;
    } else {
      status = 1;
    }
    let param = {
      userId: this.userData.userId,
      hotelId: this.reqparam.hotelId,
      categoryId: category.categoryId,
      roleId: this.userData.roleId,
      status: status
    };
    this.constant.LoadingPresent();
    this.service.updateCategoryStatusAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if (result) {
        this.constant.ToastCustom(result.message, 'top');
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

  async presentActionSheet(category) {
    // console.log(category);
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Edit Category',
        icon: 'create',
        handler: () => {
          this.onEditCategory(category);
       
        }
      }, {
        text: 'Delete Category',
        icon: 'trash',
        handler: () => {
          // console.log('Delete clicked');
          this.onDeleteCategory(category);
        }
      }
      ]
    });
    await actionSheet.present();
  }

  async onEditCategory(category) {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddcategotyPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId, pageStatus: 'Edit', categoryDetail: category }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getCategoryList();
      }

    });
    return await modal.present();
  }

  async onDeleteCategory(category) {
    const alertmes = await this.alertCtrl.create({
      header: 'Delete Category',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this category?',
      backdropDismiss: false,
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'icon-cancel',

          handler: () => {
            //this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'yes',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.deleteRoom(category);
          }
        }
      ]
    });
    return await alertmes.present();
  }

  deleteRoom(category){
    this.reqparam.page = 0;
    let param = {
      userId: this.userData.userId,
      categoryId: category.categoryId,
    };
    this.constant.LoadingPresent();
    this.service.deletecategoryAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if(result){
        this.constant.ToastCustom(result.message,'top');
        var index = this.categoryList.findIndex(p => p.categoryId == category.categoryId);
        this.categoryList.splice(index, 1);
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

}
