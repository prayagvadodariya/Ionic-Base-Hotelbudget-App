import { Component, OnInit } from "@angular/core";
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { AlertController,ActionSheetController,ModalController } from "@ionic/angular";
import { AddRoomPage } from "../add-room/add-room.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-room",
  templateUrl: "./manage-room.page.html",
  styleUrls: ["./manage-room.page.scss"]
})
export class ManageRoomPage implements OnInit {
  reqparam = { hotelId: 0, roleId: 0, userId: 0, page: 0 };
  userData: any;
  hotelList: any = [];
  getRoomsList: any = [];
  hide: any;
  infiniteScrollEnable = false;
  hotelName:any;
  ProcActivo: boolean = false; // default value

  message = "";
  message_title = "";
  constructor(
    public constant: Constant,
    public service: webServicenew,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router 
  ) {
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {
    // if (this.constant.HotelId) {
    //   this.reqparam.hotelId = this.constant.HotelId;
    //   var index = this.hotelList.findIndex(p => p.hotelId == this.constant.HotelId);
    //   this.hotelName = this.hotelList[index].hotelName;
    // } else {
    //   console.log(this.hotelList);
    //   this.reqparam.hotelId = this.hotelList[0].hotelId;
    //   this.hotelName = this.hotelList[0].hotelName;
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
    }else if (this.userData.roleId==5){
     this.hotelName = this.constant.hotelName;
     this.reqparam.hotelId = this.userData.hotelId;
    //  console.log(this.hotelName);
    }else if (this.userData.roleId==6){
      this.hotelName = this.constant.hotelName;
      this.reqparam.hotelId = this.userData.hotelId;
      // console.log(this.hotelName);
     }
    this.reqparam.roleId = this.userData.roleId;
    this.reqparam.userId = this.userData.userId;
    this.getManageRooms();
  }

  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }

  getManageRooms() {
    this.constant.LoadingPresent();
    this.service.getPMAllRoomsAPI(this.reqparam).subscribe(
      result => {
        this.constant.LoadingHide();
        if (result.status) {
          // console.log(result);
          this.message = result.setting.message;
          this.message_title = result.setting.message_title;
          this.getRoomsList = result.data.roomListArr;
          // console.log(this.getRoomsList);
          for (let i = 0; i < this.getRoomsList.length; i++) {
            if (this.getRoomsList[i].status === "1" || this.getRoomsList[i].status == true) {
              this.getRoomsList[i].status = true;
            } else {
              this.getRoomsList[i].status = false;
            }
          }
          if (result.data.roomListArr < 10) {
            this.infiniteScrollEnable = false;
          } else {
            this.infiniteScrollEnable = true;
          }
          // this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
          //this.constant.ToastCustom(result.message, "top");
          this.getRoomsList=[];
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }
  InfinitScrollingAPI(event) {
    // console.log(event);
    if (this.getRoomsList.length > 0) {
      this.reqparam.page += 10;
    }
    // this.getNotification();
    this.constant.LoadingPresent();
    this.service.getPMAllRoomsAPI(this.reqparam).subscribe(
      result => {
        this.constant.LoadingHide();
        event.target.complete();
        if (result.status) {
          var roomListArr = result.data.roomListArr;
          // console.log(roomListArr);
          for (let index = 0; index < roomListArr.length; index++) {
            this.getRoomsList.push(roomListArr[index]);
          }
          for (let i = 0; i < this.getRoomsList.length; i++) {
            if (this.getRoomsList[i].status === "1" || this.getRoomsList[i].status == true) {
              this.getRoomsList[i].status = true;
            } else {
              this.getRoomsList[i].status = false;
            }
          }
          if (roomListArr.length < 10) {
            this.infiniteScrollEnable = false;
          } else {
            this.infiniteScrollEnable = true;
          }
          // this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }
  async confirmStatusCLick1(room) {
    // console.log(room);
    let statusAlert = await this.alertCtrl.create({
      header: "Exit?",
      message: "Do you want to exit the app?",
      backdropDismiss: false,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            statusAlert = null;
          }
        },
        {
          text: "Exit",
          handler: () => {
            navigator["app"].exitApp();
          }
        }
      ]
    });
    statusAlert.present();
  }

  roomSortClick() {
    if (this.hide) {
      this.hide = !this.hide;
      this.getRoomsList = this.getRoomsList.sort(function(a, b) {
        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
      });
    } else {
      this.hide = !this.hide;
      this.getRoomsList = this.getRoomsList.sort(function(a, b) {
        return a.created > b.created ? 1 : a.created < b.created ? -1 : 0;
      });
    }
  }

  changeHotel(eve){
    const index = this.hotelList.findIndex(p => p.hotelId === eve.detail.value);
    // console.log('changeHotel')
    // console.log(eve.target.value);
    this.reqparam.page = 0;
    this.infiniteScrollEnable = false;
    this.hotelName = this.hotelList[index].hotelName;
    this.reqparam.hotelId = eve.detail.value;
    this.getManageRooms();
  }

  async check(clickedid, item, ev) {
    // console.log(clickedid, item);
    // console.log(ev.target.value, ev.target.checked);
    var ab: string;
    ab = "chk" + clickedid;
    // console.log(ab);
    const ele = document.getElementById(ab) as HTMLInputElement;
    // console.log(ele.checked);
    // ele.checked = false;

    if (ele.checked === true) {
      // console.log("jgjgjgj");
      let statusAlert = await this.alertCtrl.create({
        header: "Alert",
        cssClass: "add-item-alert roomadd activepopup",
        message: "Are you sure want to active this item?",
        backdropDismiss: false,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "icon-cancel",
            handler: () => {
              return false;
            }
          },
          {
            text: "OK",
            cssClass: "done-btn btnsize1",
            handler: () => {
              ele.checked = false;
            }
          }
        ]
      });
      statusAlert.present();
    } else {
      let statusAlert = await this.alertCtrl.create({
        header: "Alert",
        cssClass: "add-item-alert roomadd activepopup",
        message: "Are you sure want to deactive this item?",
        backdropDismiss: false,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "icon-cancel",
            handler: () => {
              return true;
            }
          },
          {
            text: "OK",
            cssClass: "done-btn btnsize1",
            handler: () => {
              ele.checked = true;
            }
          }
        ]
      });
      statusAlert.present();
    }
    // console.log(ele.checked);
  }

  async activeDeactiveRoom(room) {
    // console.log(room);
    // console.log(room.status);
    if (room.status == true) {
      var message = "Do you wish to activate this room status?";
    } else {
      var message = "Do you wish to deactivate this room status?";
    }
    const alert = await this.alertCtrl.create({
      header: "Alert",
      cssClass: "add-item-alert roomadd activepopup",
      message: message,
      buttons: [
        {
          text: "",
          role: "cancel",
          cssClass: 'icon-cancel',
          handler: () => {
            if (room.status == false) {
              room.status = true;
            } else {
              room.status = false;
            }
          }
        },
        {
          text: "yes",
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.changeRoomStatus(room);
          }
        }
      ]
    });
    return await alert.present();
  }

  changeRoomStatus(room) {
    
    var status;
    if (room.status == false) {
      status = 0;
    } else {
      status = 1;
    }
    let param = {
      userId: this.userData.userId,
      hotelId: this.reqparam.hotelId,
      roomId: room.roomId,
      status: status
    };
    this.constant.LoadingPresent();
    this.service.updateRoomStatusAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if(result){
        this.constant.ToastCustom(result.message,'top');
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }

  // async onAddRoom1(roomDetail) {
  //   this.reqparam.page = 0;
  //   var header;
  //   if(roomDetail){
  //     header='Edit Room';
  //   }else{
  //     header='Add Room';
  //   }
  //   const alertmes = await this.alertCtrl.create({
  //     header: header,
  //     cssClass: "add-item-alert roomadd",
  //     message: "Room  Name/No.",
  //     backdropDismiss: false,
  //     inputs: [
  //       {
  //         name: "name",
  //         type: "text",
  //         placeholder: "Enter here..",
  //         value: roomDetail.room
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: "",
  //         // role: 'cancel',
  //         cssClass: "icon-cancel",

  //         handler: () => {}
  //       },
  //       {
  //         text: "Ok",
  //         cssClass: "done-btn btnsize1",
  //         handler: data => {
  //           console.log(data);
  //           if (data.name) {
  //             if(roomDetail){
  //               this.editRoom(roomDetail,data.name);
  //             }else{
  //               this.AddRoom(data.name);
  //             }
              
  //           } else {
  //             this.constant.ToastCustom("Please enter require field", "Top");
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   return await alertmes.present();
  // }

  async onAddRoom() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddRoomPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId, pageStatus: 'Add' }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getManageRooms();
      }

    });
    return await modal.present();

  }

  async editRoom(item) {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddRoomPage,
        cssClass: 'custom-modal addcategorymodel',
        componentProps: { hotelId: this.reqparam.hotelId,pageStatus: 'Edit', roomDetail: item }
      });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.reqparam.page = 0;
        this.infiniteScrollEnable = true;
        this.getManageRooms();
      }

    });
    return await modal.present();
  }

  
  // AddRoom(roomName) {
  //   let param = {
  //     userId: this.userData.userId,
  //     hotelId: this.reqparam.hotelId,
  //     roleId: this.userData.roleId,
  //     room: roomName,
  //   };
  //   //this.constant.LoadingPresent();
  //   this.service.addRoomAPI(param).subscribe(result => {
  //     //this.constant.LoadingHide();
  //     if(result){
  //       this.constant.ToastCustom(result.data.message,'top');
  //       this.getManageRooms();
  //     }
  //   });
  // }

  // editRoom(roomDetail,roomName){
  //   console.log(roomDetail);
  //   let param = {
  //     userId: this.userData.userId,
  //     hotelId: this.reqparam.hotelId,
  //     roomId: roomDetail.roomId,
  //     room:roomName
  //   };
  //   //this.constant.LoadingPresent();
  //   this.service.editRoomAPI(param).subscribe(result => {
  //     //this.constant.LoadingHide();
  //     if(result){
  //       this.constant.ToastCustom(result.data.message,'top');
  //       this.getManageRooms();
  //     }
  //   });
  // }

  async presentActionSheet(room) {
    // console.log(room);
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Edit Room',
        icon: 'create',
        handler: () => {
          this.editRoom(room);
        
        }
      }, {
        text: 'Delete Room',
        icon: 'trash',
        handler: () => {
          // console.log('Delete clicked');
          this.onDeleteItem(room);
        }
      }
    ]
    });
    await actionSheet.present();
  }
  
  async onDeleteItem(room) {
    const alertmes = await this.alertCtrl.create({
      header: 'Delete Item',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this room?',
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
            this.deleteRoom(room);
          }
        }
      ]
    });
    return await alertmes.present();
  }

  deleteRoom(room){
    this.reqparam.page = 0;
    let param = {
      userId: this.userData.userId,
      roomId: room.roomId,
    };
    this.constant.LoadingPresent();
    this.service.deleteRoomAPI(param).subscribe(result => {
      this.constant.LoadingHide();
      if(result){
        this.constant.ToastCustom(result.message,'top');
        //this.getManageRooms();
        var index = this.getRoomsList.findIndex(p => p.roomId == room.roomId);
        this.getRoomsList.splice(index, 1);
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
  }
}
