import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Constant } from './constant';
import { Platform, NavController, AlertController, NavParams, ToastController } from '@ionic/angular';

@Injectable()

export class WebServiceHandler {


    constructor(private http: Http, private constant: Constant, public navCtrl: NavController) {

    }


    Post(URL, Parameter) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var Option = new RequestOptions({ headers: headers });
       // console.log(Option);
        return this.http.post(URL, Parameter, Option).pipe(map(data => {
         //   console.log(data);
            return this.requestResponseFunction(data);
        }, error => {
            return this.requestResponseFunction(error);
           // return error;
        }));
    }


    PostWithHeader(URL, Parameter) {
        var accessToken = JSON.parse(localStorage.getItem("v_access_token"));
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': accessToken });
        var Option = new RequestOptions({ headers: headers });

        return this.http.post(URL, Parameter, Option).pipe(map(data => {
            // return data;
          //  console.log(data);
            return this.requestResponseFunction(data);
        }, error => {
         //   console.log(error);
            return this.requestResponseFunction(error);
            //return error;
        }));
    }

    GetWithHeader(URL){
        var accessToken = JSON.parse(localStorage.getItem("v_access_token"));
        let headers = new Headers({'Content-Type': 'application/json','Accept' : 'application/json','Authorization' : 'Bearer' + accessToken});
        var Option = new RequestOptions({headers:headers});

        return this.http.get(URL, Option).pipe(map(data => {
            return data;
        }, error => {
            return error;
        }));
    }

    Get(URL) {
        return this.http.get(URL).pipe(map(data => {
          //  console.log(data);
            return this.requestResponseFunction(data);
        }, error => {
           // console.log('WebserviceHandler=>' + error);
            return error;
        }));
    }

    requestResponseFunction(data) {
        if (data.status == 200 || data.status === 201) {
            //this.constant.ToastCustom('OK','top');
            return data;
        }
        // 400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415
        else if (data.status == 400 || data.status == 401 || data.status == 402 || data.status == 403 || data.status == 404 || data.status == 405 || data.status == 406 || data.status == 407 ||
            data.status == 408 || data.status == 409 || data.status == 410 || data.status == 411 || data.status == 412 || data.status == 413 || data.status == 414 || data.status == 415) {
            return this.constant.ToastCustom('Unauthorized', 'top');
            // this.navCtrl.navigateForward('/dashboard');
        }
        //500,501,502,503,504,505
        else if (data.status == 500 || data.status === 501 || data.status === 502 || data.status === 503 || data.status === 504 || data.status === 505) {
            return this.constant.ToastCustom('Internal Server Error', 'top');
            //this.navCtrl.navigateForward('/dashboard');
            //return data;
        }
    }
}
