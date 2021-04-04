import { Component, OnInit } from "@angular/core";
import { AlertController,ModalController ,ActionSheetController} from "@ionic/angular";
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { AddItemPageModule } from "../add-item/add-item.module";
import { AddItemPage } from "../add-item/add-item.page";
import { Router } from "@angular/router";
@Component({
  selector: "app-manage-items",
  templateUrl: "./manage-items.page.html",
  styleUrls: ["./manage-items.page.scss"]
})
export class ManageItemsPage implements OnInit {
  userData: any = [];
  reqparam: any = {};
  hotelList: any = [];

  categoryList: any = [];
  ItemList: any = [];
  infiniteScrollEnable = true;
  hotelName: any;
  message = "";
  message_title = "";
  //categoryId:any;
  constructor(
    public alertCtrl: AlertController,
    public constant: Constant,
    public service: webServicenew,
    private modalCtrl: ModalController,
    private router: Router, 
    public actionSheetController: ActionSheetController
  ) {
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {

  

    // if (this.constant.HotelId) {
    //   this.reqparam.hotelId = this.constant.HotelId;
    // } else {
    //   this.hotelList = JSON.parse(localStorage.getItem("HotelList"));
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

    
    this.getAllList();
   
  }

  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }

  getAllList() {
    const dic = {
      hotelId: this.reqparam.hotelId,
      roleId: this.userData.roleId,
      userId: this.userData.userId
    };
    this.constant.LoadingPresent();
    this.service.getPMgetRooms(dic).subscribe(
      result => {
        this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
          this.categoryList = result.data.categoryList;
          this.reqparam.categoryId = this.categoryList[0].categoryId;
          this.reqparam.page = 0;
          this.getItems();
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  changeHotel(eve) {
    const index = this.hotelList.findIndex(p => p.hotelId === eve.detail.value);
    // console.log('changeHotel')
    // console.log(eve);
    this.reqparam.page = 0;
    this.hotelName = this.hotelList[index].hotelName;
    this.reqparam.hotelId = eve.detail.value;
    this.getAllList();
  }

  changeCategory(eve) {
    // console.log('changeCategory')
    // console.log(eve);
    // console.log( eve.target.value)
    this.reqparam.page = 0;
      //this.reqparam.categoryId = eve.target.value;
      this.getItems();
    

  }

  getItems() {
    // console.log(this.reqparam);
    this.service.getPMItemListAPI(this.reqparam).subscribe(
      result => {
        
        if (result.status) {
          // console.log(result);
          this.message = result.setting.message;
          this.message_title = result.setting.message_title;
          this.ItemList = result.data.itemListArr;
          for (let i = 0; i < this.ItemList.length; i++) {
            if (this.ItemList[i].status === "1") {
              this.ItemList[i].itemStatus = true;
            } else {
              this.ItemList[i].itemStatus = false;
            }
          }
          // this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
          //this.constant.ToastCustom(result.message, "top");
          this.ItemList = [];
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  InfinitScrollingProject(infiniteScroll: any) {
    // console.log(this.infiniteScrollEnable);
    if (this.ItemList.length > 0) {
      this.reqparam.page ++;
    }
    let responseData;
    this.service.getPMItemListAPI(this.reqparam).subscribe((result) => {
      // console.log(result)
      infiniteScroll.target.complete();
      if (result.status) {
        responseData = result.data.itemListArr;
        // console.log(responseData)
        for (let index = 0; index < responseData.length; index++) {

          if (responseData[index].status === "1") {
            responseData[index].itemStatus = true;
          } else {
            responseData[index].itemStatus = false;
          }
          this.ItemList.push(responseData[index]);
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

  async activeDeactiveItem(item) {
    // console.log(item);
    if (item.itemStatus == true) {
      var message = "Are you sure you want to active this item?";
    } else {
      var message = "Are you sure you want to deactive this item?";
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
            if (item.itemStatus == false) {
              item.itemStatus = true;
            } else {
              item.itemStatus = false;
            }
          }
        },
        {
          text: "yes",
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.changeItemStatus(item);
          }
        }
      ]
    });
    return await alert.present();
  }

  changeItemStatus(item) {
    var status;
    if (item.itemStatus == false) {
      status = 0;
    } else {
      status = 1;
    }
    let param = {
      userId: this.userData.userId,
      hotelId: this.reqparam.hotelId,
      itemId: item.itemId,
      roleId: this.userData.roleId,
      status: status
    };
    this.constant.LoadingPresent();
    this.service.updateItemStatusAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if (result) {
        this.constant.ToastCustom(result.message, 'top');
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

  async onAddItem1() {
    const alertmes = await this.alertCtrl.create({
      header: "Add Item",
      cssClass: "add-item-alert",
      message: "Item Name",
      backdropDismiss: false,
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Enter Item Name"
        }
      ],
      buttons: [
        {
          text: "",
          // role: 'cancel',
          cssClass: "icon-cancel",

          handler: () => {
            //this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: "Ok",
          cssClass: "done-btn btnsize1",
          handler: () => {
            //this.onLogoutApiFunction();
          }
        }
      ]
    });
    return await alertmes.present();
  }

  async presentActionSheet(item) {
    // console.log(item);
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Edit Item',
        icon: 'create',
        handler: () => {
          this.onEditItem(item);
       
        }
      }, {
        text: 'Delete Item',
        icon: 'trash',
        handler: () => {
          // console.log('Delete clicked');
          this.onDeleteItem(item);
        }
      }
      ]
    });
    await actionSheet.present();
  }

  async onAddItem() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddItemPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId,categoryId:this.reqparam.categoryId, pageStatus: 'Add' }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getItems();
      }

    });
    return await modal.present();

  }


  async onEditItem(item) {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddItemPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId,categoryId:this.reqparam.categoryId, pageStatus: 'Edit', itemDetail: item }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getItems();
      }

    });
    return await modal.present();
  }

  async onDeleteItem(item) {
    const alertmes = await this.alertCtrl.create({
      header: 'Delete Item',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this item?',
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
            this.deleteItem(item);
          }
        }
      ]
    });
    return await alertmes.present();
  }

  deleteItem(item){
    this.reqparam.page = 0;
    let param = {
      userId: this.userData.userId,
      itemId: item.itemId,
    };
    this.constant.LoadingPresent();
    this.service.deleteItemAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if(result){
        this.constant.ToastCustom(result.message,'top');
        var index = this.ItemList.findIndex(p => p.itemId == item.itemId);
        this.ItemList.splice(index, 1);
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }
}
