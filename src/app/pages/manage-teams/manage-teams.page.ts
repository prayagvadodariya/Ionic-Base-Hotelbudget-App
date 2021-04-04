


import { ManageTeamsEditDeleteComponent } from '../../../components/manage-teams-edit-delete/manage-teams-edit-delete.component';

import { PopoverController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.page.html',
  styleUrls: ['./manage-teams.page.scss'],
})
export class ManageTeamsPage implements OnInit {
  userData: any;
  hotelName: any;
  listData: any=[];
  status: any;

  constructor(public popoverController: PopoverController, private router: Router, public constant: Constant,
    public alertCtrl: AlertController, public service: webServicenew) {           
    this.userData = this.constant.getUserData();
    this.hotelName = this.constant.hotelName
  }

   ngOnInit() {
   
  }
  addTeam(){
    this.router.navigate(['/add-team']);
    // console.log("addrteam")
  }
  ionViewWillEnter() {
    this.getList();
  }
  

  getList() {
    let dic = {
      userId: this.userData.roleId,
      hotelId: this.constant.HotelId,
      

    }
    this.constant.LoadingPresent();
    
    this.service.getTeamList(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
       this.listData = result.data.teamListArr;
       for (let i = 0; i < this.listData.length; i++) {
        if (this.listData[i].status === "1" || this.listData[i].status == true) {
          this.listData[i].status = true;
        } else {
          this.listData[i].status = false;
        }
      }
       console.log("lostdata",this.listData)
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

  teamDelete(item) {
    console.log("itemdelate", item)
    let dic = {
      userId: this.userData.roleId,
      teamId: item.teamId,
      

    }
    this.constant.LoadingPresent();
    
    this.service.deleteTeam(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.getList();
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

  async statusActiveDeactive(Checked) {
    // console.log(room);
    // console.log(room.status);
    if (Checked.status == true) {
      var message = "Do you wish to activate this team status?";
    } else {
      var message = "Do you wish to deactivate this team status?";
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
            if (Checked.status == false) {
              Checked.status = true;
            } else {
              Checked.status = false;
            }
          }
        },
        {
          text: "yes",
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.Statusupdate(Checked);
            // this.changeRoomStatus(room);
          }
        }
      ]
    });
    return await alert.present();
  }

  Statusupdate(Checked){
    var status;
    if (Checked.status == false) {
      status = 2;
    } else {
      status = 1;
    }
    let dic = {
      userId: this.userData.roleId,
      hotelId: this.constant.HotelId,	
      teamId:	Checked.teamId ,
      status: status,
      

    }
    this.constant.LoadingPresent();
    
    this.service.updateStatus(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

 async openComponent(ev: any,item) {
   var array=['Edit','Delete'];
    const popover = await this.popoverController.create({
      component: ManageTeamsEditDeleteComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover-delete-edit',
      componentProps: {
        arrayoflist: array
      }
    });
    await popover.present();
    popover.onDidDismiss().then((response) => {
      console.log(response)
      if (response.data) {
        if (response.data.status == 'Edit') {
          this.router.navigate(['/add-team', {data: JSON.stringify(item)}]);
        } else if (response.data.status == 'Delete') {
           this.confirmationDelele(item);
        }
      }

    })
  }

  async confirmationDelele(item) {
    const alertmes = await this.alertCtrl.create({
      header: 'Delete Team',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this team?',
      backdropDismiss: false,
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'icon-cancel',

          handler: () => {
           
          }
        },
        {
          text: 'yes',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.teamDelete(item);
          }
        }
      ]
    });
    return await alertmes.present();
  }
}
