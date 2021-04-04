import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-pass-on-notes',
    templateUrl: './pass-on-notes.page.html',
    styleUrls: ['./pass-on-notes.page.scss'],
})
export class PassOnNotesPage implements OnInit {
    @ViewChild('datePicker') datePicker;
    allmynotes: string = "AllNotes";
    YMDsegment: string = "day";
    oldYMDsegment: string = "day";
    userdata: any;
    senddata = {
        userId: "",
        hotelId: 0,
        year: "",
        month: "",
        day: "",
        page: 0,
    }
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    yearlist: any = []; // yearlist = ['2018','2019','2020','2021','2022'];
    showselectedate: string = "";
    getallnote: any;
    getmynote: any;
    getnoteData: any = [];
    infiniteScrollEnable: any;
    currentmonth: any;
    currentYear: any;
    currentDay: any;
    selectedindex: any;
    myDate: any = new Date().toISOString();
    tempcheck1 = 0;
    today: any;

    constructor(public navCtrl: NavController, private router: Router, public service: webServicenew, public constant: Constant, public alertController: AlertController, ) {

        this.userdata = constant.getUserData();
        this.senddata.userId = this.userdata.userId;
        if (this.userdata.roleId == 1) {
            this.senddata.hotelId = this.constant.HotelId;
        } else {
            this.senddata.hotelId = this.userdata.hotelId;
        }

        this.selectedindex = 'AllNotes';
        this.currentDay = new Date().getDay();
        this.currentYear = new Date().getFullYear();
        for (let i = 2019; i <= (this.currentYear + 1); i++) {
            this.yearlist.push(i);
        }

        this.currentDay = new Date().getDay();
        this.currentYear = new Date().getFullYear();
        var temp = this.myDate.toString();
        var data = temp.split("T");
        this.senddata.year = "";
        var datePipe = new DatePipe('en-US');
        this.currentmonth = new Date().getMonth();
        this.showselectedate = datePipe.transform(this.myDate, 'dd MMM, yyyy');
        this.senddata.day = datePipe.transform(this.myDate, 'dd MMM, yyyy');
    }

    // ngOnInit() {

    // }

    //getdataNotes
    GetNotesData() {   
        this.senddata.page = 0;
        this.constant.LoadingPresent();
        this.getallnote = [];
        this.getmynote = [];
        this.service.getPassonNote(this.senddata).subscribe((result) => {
            this.constant.LoadingHide();
            if (result.status) {
                this.getallnote = result.data.allNotes;
                this.getmynote = result.data.myNotes;
                if (this.allmynotes == 'AllNotes') {
                    if (this.getallnote.length < 20) {
                        this.infiniteScrollEnable = false;
                    }
                    else {
                        this.infiniteScrollEnable = true;
                    }
                } else if (this.allmynotes == 'MyNotes') {
                    if (this.getmynote.length < 20) {
                        this.infiniteScrollEnable = false;
                    }
                    else {
                        this.infiniteScrollEnable = true;
                    }
                }
            } else {
                this.constant.ToastCustom("No notes available at this moment", 'top');
            }
        }, error => {
            this.constant.Logout(error);
        });
    }


    //GetmyNotesData
    GetmyNotesData() {
        this.senddata.page = 0;
        this.constant.LoadingPresent();
        this.getallnote = [];
        this.getmynote = [];
        // var senddata1 = {
        //     userId: this.senddata.userId,
        //     hotelId: this.senddata.hotelId,
        //     year: this.senddata.year,
        //     month: this.senddata.month,
        //     day: this.senddata.day,
        //     page: this.senddata.page,
        // }
        this.service.getMyPassonNote(this.senddata).subscribe((result) => {
            this.constant.LoadingHide();
            if (result.status) {
                this.getallnote = result.data.allNotes;
                this.getmynote = result.data.myNotes;
                if (this.allmynotes == 'AllNotes') {
                    if (this.getallnote.length < 20) {
                        this.infiniteScrollEnable = false;
                    }
                    else {
                        this.infiniteScrollEnable = true;
                    }
                } else if (this.allmynotes == 'MyNotes') {
                    if (this.getmynote.length < 20) {
                        this.infiniteScrollEnable = false;
                    }
                    else {
                        this.infiniteScrollEnable = true;
                    }
                }
            } else {
                this.constant.ToastCustom("No notes available at this moment", 'top');
            }
        }, error => {
            this.constant.Logout(error);
        });
    }

    InfinitScrolling(event) {
        if (this.allmynotes == 'AllNotes') {
            if (this.getallnote.length > 0) {
                this.senddata.page += 20;
            }

            this.callallnoteagin();
            event.target.complete();
        } else if (this.allmynotes == 'MyNotes') {
            if (this.getmynote.length > 0) {
                this.senddata.page += 20;
            }
            this.callmynoteagin();
            event.target.complete();
        }

    }
    callallnoteagin() {
        var senddata1 = {
            userId: this.senddata.userId,
            hotelId: this.senddata.hotelId,
            year: this.senddata.year,
            month: this.senddata.month,
            day: this.senddata.day,
            page: this.senddata.page,
        }
        this.constant.LoadingPresent();
        this.service.getPassonNote(senddata1).subscribe(
            result => {
                this.constant.LoadingHide();

                if (result.status) {
                    let responseDataAll = result.data.allNotes;
                    let responseData = result.data.allNotes;
                    if (this.allmynotes == 'AllNotes') {
                        for (var i = 0; i < responseDataAll.length; i++) {
                            this.getallnote.push(responseDataAll[i]);
                        }
                        if (responseDataAll.length < 20) {
                            this.infiniteScrollEnable = false;
                        }
                        else {
                            this.infiniteScrollEnable = true;
                        }
                    } else if (this.allmynotes == 'MyNotes') {
                        for (var i = 0; i < responseData.length; i++) {
                            this.getmynote.push(responseData[i]);
                        }
                        if (responseData.length < 20) {
                            this.infiniteScrollEnable = false;
                        }
                        else {
                            this.infiniteScrollEnable = true;
                        }
                    }
                    this.constant.ToastCustom(result.message, 'top');
                } else {
                    this.infiniteScrollEnable = false;
                    this.constant.ToastCustom(result.message, 'top');
                    this.constant.LogoutSession(result.status_key);
                }
            },
            error => {

            }
        );
    }

    callmynoteagin() {
        var senddata1 = {
            userId: this.senddata.userId,
            hotelId: this.senddata.hotelId,
            year: this.senddata.year,
            month: this.senddata.month,
            day: this.senddata.day,
            page: this.senddata.page,
        }
       
        this.constant.LoadingPresent();
        this.service.getMyPassonNote(senddata1).subscribe(
            result => {
                this.constant.LoadingHide();

                if (result.status) {
                    let responseDataAll = result.data.allNotes;
                    let responseData = result.data.allNotes;
                    if (this.allmynotes == 'AllNotes') {
                        for (var i = 0; i < responseDataAll.length; i++) {
                            this.getallnote.push(responseDataAll[i]);
                        }
                        if (responseDataAll.length < 20) {
                            this.infiniteScrollEnable = false;
                        }
                        else {
                            this.infiniteScrollEnable = true;
                        }
                    } else if (this.allmynotes == 'MyNotes') {
                        for (var i = 0; i < responseData.length; i++) {
                            this.getmynote.push(responseData[i]);
                        }
                        if (responseData.length < 20) {
                            this.infiniteScrollEnable = false;
                        }
                        else {
                            this.infiniteScrollEnable = true;
                        }
                    }
                    this.constant.ToastCustom(result.message, 'top');
                } else {
                    this.infiniteScrollEnable = false;
                    this.constant.ToastCustom(result.message, 'top');
                    this.constant.LogoutSession(result.status_key);
                }
            },
            error => {

            }
        );
    }

    allNotes() {
        if (this.allmynotes === 'AllNotes') {
            var datePipe = new DatePipe('en-US');
            this.currentYear = new Date().getFullYear();
            this.currentmonth = new Date().getMonth();
            this.showselectedate = datePipe.transform(this.myDate, 'dd MMM, yyyy');
            this.YMDsegment = "day";
            this.senddata.month = "";
            this.senddata.day = datePipe.transform(this.myDate, 'yyyy-M-dd');
            var temp = this.myDate.toString();
            this.senddata.year = "";
            this.GetNotesData();
        } else if (this.allmynotes === 'MyNotes') {
            var datePipe = new DatePipe('en-US');
            this.currentYear = new Date().getFullYear();
            this.currentmonth = new Date().getMonth();
            this.showselectedate = datePipe.transform(this.myDate, 'dd MMM, yyyy');
            this.YMDsegment = "day";
            this.senddata.month = "";
            this.senddata.day = datePipe.transform(this.myDate, 'yyyy-M-dd');
            var temp = this.myDate.toString();
            this.senddata.year = "";
            this.GetmyNotesData();
        }
    }
    yearcheck() {
        if (this.YMDsegment === 'year') {
            this.senddata.month = "";
            this.senddata.day = "";
            this.AlertCustom();
        } else if (this.YMDsegment === 'day') {
            this.senddata.month = "";
            this.senddata.year = "";
            // this.myDate = new Date().toISOString();
            this.showDatepicker();

        } else if (this.YMDsegment === 'month') {
            this.senddata.day = "";
            this.senddata.year = "";
            this.AlertCustom();
        }
    }

    showDatepicker() {
        this.datePicker.open();
        console.log('showDatepicker');
    }
    Canceldate() {
        this.YMDsegment = this.oldYMDsegment;
        console.log('Canceldate');
    }

    datechange() {
        var datePipe = new DatePipe('en-US');    
        this.senddata.month = "";
        var temp = this.myDate.toString();
        var data = temp.split("T");
        this.senddata.day = data[0];
        this.oldYMDsegment = this.YMDsegment;

        if(this.YMDsegment === 'day') {
            this.showselectedate = datePipe.transform(this.senddata.day, 'dd MMM, yyyy');
        }

        if (this.allmynotes == 'AllNotes') {
            this.GetNotesData();
        } else if (this.allmynotes == 'MyNotes') {
            this.GetmyNotesData();
        }

    }
    async AlertCustom() {

        var tempdata = [];
        var selectTitle = "";
        if (this.YMDsegment == "year") {
            this.yearlist.forEach(data => {
                var temp = {
                    type: 'radio',
                    label: data,
                    value: data,
                    name: data
                }
                tempdata.push(temp);
            });
            selectTitle = "Select Year";
            console.log("year");
        } else if (this.YMDsegment == "month") {
            this.monthNames.forEach(data => {
                var temp = {
                    type: 'radio',
                    label: data,
                    value: data,
                    name: data
                };
                tempdata.push(temp);
            });
            selectTitle = "Select Month";
            console.log("month");
        }

        let alert = await this.alertController.create({
            header: selectTitle,
            inputs: tempdata,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.YMDsegment = this.oldYMDsegment;
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: (data) => {
                        if (this.YMDsegment == "year") {
                            this.senddata.year = data;
                            this.showselectedate = data;
                            this.currentYear = data;
                           
                            this.oldYMDsegment = this.YMDsegment;
                            if (this.allmynotes == 'AllNotes') {
                                this.senddata.month = "";
                                this.senddata.day = "";
                                this.GetNotesData();
                            } else if (this.allmynotes == 'MyNotes') {
                                this.senddata.month = "";
                                this.senddata.day = "";
                                this.GetmyNotesData();
                            }
                        } else if (this.YMDsegment == "month") {
                            for (var i = 0; i < this.monthNames.length; i++) {
                                if (this.monthNames[i] == data) {
                                    this.showselectedate = this.monthNames[i] + ", " + this.currentYear;
                                    var temp = i + 1;
                                    this.senddata.month = temp.toString();
                                    this.senddata.year = this.currentYear;
                                    if (this.allmynotes == 'AllNotes') {
                                        this.senddata.day = "";
                                        this.GetNotesData();
                                    } else if (this.allmynotes == 'MyNotes') {
                                        this.senddata.day = "";
                                        this.GetmyNotesData();
                                    }
                                    break;
                                }
                            }
                        }
                        // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
                    }
                }
            ]
        });
        alert.present();

    }
    //New Add Note 
    addNote() {
        // this.router.navigate(['/edit-profile');
        let navigationExtras: NavigationExtras = {
            state: {
                status: 0,
            }
        };
        this.navCtrl.navigateForward('/create-pass-on-note', navigationExtras);
        // this.navCtrl.navigateRoot('/create-pass-on-note');
    }

    EditandDelete(item) {
        let navigationExtras: NavigationExtras = {
            state: {
                status: 1,
                notedata: item
            }
        };
        this.navCtrl.navigateForward('/create-pass-on-note', navigationExtras);
    }

    ngOnInit() {
        if (this.allmynotes == 'AllNotes') {
            this.GetNotesData();
        } else if (this.allmynotes == 'MyNotes') {
            this.GetmyNotesData();
        }
    }

    ionViewDidEnter() {
        if( this.constant.passonnotes_back ){
            if (this.allmynotes == 'AllNotes') {
                this.GetNotesData();
            } else if (this.allmynotes == 'MyNotes') {
                this.GetmyNotesData();
            }
            this.constant.passonnotes_back = false;
        }
    }

    pinClick(id, index) {

        let pin;
        if (this.allmynotes == 'AllNotes') {
            this.getallnote[index].isPin = this.getallnote[index].isPin == 1 ? pin = 0 : pin = 1;
        } else if (this.allmynotes == 'MyNotes') {
            this.getmynote[index].isPin = this.getmynote[index].isPin == 1 ? pin = 0 : pin = 1;
        }
        var senddata2 = {
            userId: this.senddata.userId,
            ponId: id,
            isPin: pin
        }
        this.service.UpdatePinNote(senddata2).subscribe((result) => {
            if (result.status) {
                this.constant.ToastCustom(result.message, 'top');
            } else {
                this.constant.ToastCustom(result.message, 'top');
                this.constant.LogoutSession(result.status_key);
            }
        }, error => {
            this.constant.Logout(error);
        });

    }

    showbody(message, index) {

        if (this.getallnote[index].userId == this.userdata.userId) {
            this.EditandDelete(this.getallnote[index]);
        } else {
            let navigationExtras: NavigationExtras = {
                state: {
                    mymessage: message
                }
            };
            this.navCtrl.navigateForward('/show-pass-on-note', navigationExtras);
        }

    }



}
