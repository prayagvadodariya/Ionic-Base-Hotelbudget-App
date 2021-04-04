import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { NavController, AlertController } from '@ionic/angular';
import { webServicenew } from './../../services/webServicenew';
import { Constant } from './../../services/constant';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
    selector: 'app-create-pass-on-note',
    templateUrl: './create-pass-on-note.page.html',
    styleUrls: ['./create-pass-on-note.page.scss'],
})
export class CreatePassOnNotePage implements OnInit {
    @ViewChild('datePicker') datePicker;
    myDate = new Date().toISOString();
    currentdata = new Date().toISOString();
    fromMaxDate: any;
    htmlText: any;


    userdata: any;

    stateCheck: number = 0;
    EdittimeData: any;
    deleteornote: number = 0;


    //date set
    fromDate = new Date().toISOString();
    toDate = new Date().toISOString();
    noteDate: any;

    senddata = {
        userId: '',
        ponBody: '',
        ponCategory: '1',
        hotelId: 0,
        scheduleDate: new Date(this.fromDate),
        toScheduleDate: new Date(this.toDate),
    };

    checkeditadd: string = '';
    callcheck = false;
    constructor(public service: webServicenew, public alertCtrl: AlertController, public activatedRoute: ActivatedRoute, private router: Router, public constant: Constant, public navCtrl: NavController) {

        this.fromMaxDate = (new Date().getFullYear() + 1) + "-12-31";

        this.activatedRoute.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                if (this.router.getCurrentNavigation().extras.state.status == 1) {
                    this.stateCheck = this.router.getCurrentNavigation().extras.state.status;
                    this.EdittimeData = this.router.getCurrentNavigation().extras.state.notedata;
                    this.senddata.userId = this.EdittimeData.userId;
                    this.senddata.hotelId = this.EdittimeData.hotelId;
                    this.senddata.ponCategory = this.EdittimeData.ponCategory;
                    this.htmlText = this.EdittimeData.ponBody;
                    this.noteDate = this.EdittimeData.Date;


                    this.senddata.scheduleDate = this.EdittimeData.scheduleDate;
                    this.senddata.toScheduleDate = this.EdittimeData.toScheduleDate;
                    var temp = new Date(parseFloat(this.EdittimeData.scheduleDate) * 1000).toISOString();
                    var temp2 = new Date(parseFloat(this.EdittimeData.toScheduleDate) * 1000).toISOString();
                    // console.log(temp2);

                    this.fromDate = temp;
                    this.currentdata = temp;
                    this.toDate = temp2;

                    this.checkeditadd = 'Edit';
                    this.callcheck = true;
                    // console.log(this.EdittimeData);
                } else {
                    this.stateCheck = this.router.getCurrentNavigation().extras.state.status;
                    // console.log(this.stateCheck);
                }


            }
        })
        this.userdata = constant.getUserData();
        this.senddata.userId = this.userdata.userId;
        if (this.userdata.roleId == 1) {
            this.senddata.hotelId = this.constant.HotelId;
        } else {
            this.senddata.hotelId = this.userdata.hotelId;
        }

        // this.senddata.hotelId = constant.HotelId.toString();
    }

    fromdatechange() {
        if (this.callcheck) {
            this.callcheck = false;
        } else {
            this.toDate = this.fromDate;
        }
    }

    async onDeleteItem() {
        const alertmes = await this.alertCtrl.create({
            header: 'Delete Note',
            // subHeader: 'Subtitle',
            message: 'You want to delete this Note?',
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
                        // this.deleteRoom(room);
                        this.deleteNote();
                    }
                }
            ]
        });
        return await alertmes.present();
    }

    selectdatetime() {
        this.datePicker.open();
    }
    ngOnInit() {

    }
    datechange() {

    }
    async savePassonnotedata() {
          console.log("save",this.htmlText);
        if (this.htmlText) {
            this.senddata.ponBody = this.htmlText;
            if (this.stateCheck == 1) {
                console.log("edit",this.htmlText);
                await this.EditData();
            } else if(this.stateCheck == 0) {  
                console.log("add",this.htmlText);         
                await this.AddData();
            }
        }
    }

    async EditData() {
        this.deleteornote = 0;
        var senddata2 = {
            userId: this.senddata.userId,
            ponId: this.EdittimeData.ponId,
            ponBody: this.senddata.ponBody,
            ponCategory: this.senddata.ponCategory,
            hotelId: this.senddata.hotelId,
            scheduleDate: new Date(this.fromDate),
            toScheduleDate: new Date(this.toDate),
        }
        this.constant.LoadingPresent();
        this.service.EditPassOnNote(senddata2).subscribe((result) => {
            this.constant.LoadingHide();
            if (result.status) {
                this.constant.passonnotes_back = true;
                this.constant.ToastCustom(result.message, 'top');
                this.navCtrl.navigateBack('/pass-on-notes');
            } else {
                this.constant.ToastCustom(result.message, 'top');
                this.constant.LogoutSession(result.status_key);
            }
        }, error => {
            this.constant.LoadingHide();
            this.constant.Logout(error);
        });
    }

    async AddData() {
        this.senddata.scheduleDate = new Date(this.fromDate);
        this.senddata.toScheduleDate = new Date(this.toDate);
        this.constant.LoadingPresent();
        this.service.addPassonNote(this.senddata).subscribe((result) => {
            this.constant.LoadingHide();
            if (result.status) {
                this.constant.passonnotes_back = true;
                this.constant.ToastCustom(result.message, 'top');
                this.navCtrl.navigateBack('/pass-on-notes');
            } else {
                this.constant.ToastCustom(result.message, 'top');
                this.constant.LogoutSession(result.status_key);
            }
        }, error => {
            this.constant.LoadingHide();
            this.constant.Logout(error);
        });
    }

    // Delete Notes
    deleteNote() {
        this.deleteornote = 1;
        var senddata2 = {
            userId: this.senddata.userId,
            ponId: this.EdittimeData.ponId
        };
        this.constant.LoadingPresent();
        this.service.DeleteNote(senddata2).subscribe((result) => {
            this.constant.LoadingHide();
            if (result.status) {
                this.constant.passonnotes_back = true;
                this.constant.ToastCustom(result.message, 'top');
                this.navCtrl.navigateBack('/pass-on-notes');
            } else {
                this.constant.ToastCustom(result.message, 'top');
                this.constant.LogoutSession(result.status_key);
            }
        }, error => {
            this.constant.LoadingHide();
            this.constant.Logout(error);
        });
    }
}
