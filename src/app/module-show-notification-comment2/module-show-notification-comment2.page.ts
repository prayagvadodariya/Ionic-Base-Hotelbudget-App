
import { webServicenew } from "../../services/webServicenew";

import { Router, ActivatedRoute } from "@angular/router";
import { Constant } from "./../../services/constant";
import { ModalController, NavParams } from "@ionic/angular";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'app-module-show-notification-comment2',
  templateUrl: './module-show-notification-comment2.page.html',
  styleUrls: ['./module-show-notification-comment2.page.scss'],
})
export class ModuleShowNotificationComment2Page implements OnInit {

  userid: any;
  notificationid: any;
  getcommentdata: any;
  sendtext: any;
  tracking: any;
  constructor( public constant: Constant,
    private changeRef: ChangeDetectorRef,
    public modalCtrl: ModalController,
    public service: webServicenew,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.get("userId")) {
      this.userid = this.navParams.get("userId");
      this.notificationid = this.navParams.get("notificationId");
      this.callgetnotificationdata();
    }
  }
  callgetnotificationdata() {
    var senddata = { userId: this.userid, notificationId: this.notificationid };
    // this.constant.LoadingPresent();
    this.service.getCommentListAPI(senddata).subscribe(
      result => {
        // this.constant.LoadingHide();
        if (result.status) {
          // console.log(result.data);
          this.getcommentdata = result.data.comments;
          // console.log(this.getcommentdata);
        } else {
          this.constant.ToastCustom(result.message, "top");
          this.constant.LogoutSession(result.status_key);
          console.log("message->>", result.message);
        }
        this.changeRef.detectChanges();
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

}
