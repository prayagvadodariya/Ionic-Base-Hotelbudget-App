var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ModalController, NavParams, ActionSheetController, Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { Constant } from "../../services/constant";
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
var GetMediaHelper = /** @class */ (function () {
    function GetMediaHelper(modalCtrl, constant, actionSheetCtrl, camera, navParams, transfer, cdRef, platform, activatedRoute) {
        this.modalCtrl = modalCtrl;
        this.constant = constant;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navParams = navParams;
        this.transfer = transfer;
        this.cdRef = cdRef;
        this.platform = platform;
        this.activatedRoute = activatedRoute;
        this.postEditerMedia = '';
        this.totalPercentage = 0;
        this.mediaFrom = '';
        this.isMediaUploading = false;
        this.fileTransfer = this.transfer.create();
        this.userData = [];
        this.UploadURL = '';
        this.ext = "";
        this.BASE_URL = this.constant.BASE_URL;
        this.userData = this.constant.getUserData();
        console.log(this.userData);
        this.mediaFrom = this.navParams.get('type');
        console.log("......................" + this.mediaFrom);
        this.UploadURL = this.BASE_URL + '/EditUser';
        console.log("UploadURL===========" + this.UploadURL);
        if (this.mediaFrom == 'camera') {
            this.OpenCameara();
        }
        else {
            this.OpenGallery();
        }
        if (this.platform.is('ios')) {
            this.ext = "";
        }
        else if (this.platform.is('android')) {
            this.ext = ".jpg";
        }
    }
    // From CAMERA
    GetMediaHelper.prototype.OpenCameara = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log('ImageData=>', imageData);
            _this.CheckMedeaExtentionCamera(imageData);
        }, function (err) {
            console.log('Camera_Cancel_err=>', err);
            //this.modalCtrl.dismiss();
            _this.modalCtrl.dismiss();
        });
    };
    // From GALLERY
    GetMediaHelper.prototype.OpenGallery = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imageData) {
            var newFileName = imageData + _this.ext;
            _this.CheckMedeaExtention(newFileName);
        }, function (err) {
            console.log('Gallery_Cancel_err=>', err);
            _this.modalCtrl.dismiss();
        });
    };
    GetMediaHelper.prototype.CheckMedeaExtentionCamera = function (mediaPath) {
        var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);
        var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);
        this.UploadImageOnServer(mediaPath, FileExtention);
    };
    GetMediaHelper.prototype.CheckMedeaExtention = function (mediaPath) {
        var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);
        var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);
        var FileName = mediaPath.substring(mediaPath.lastIndexOf('/') + 1, mediaPath.lastIndexOf('?'));
        this.UploadImageOnServer(mediaPath, FileExtention);
    };
    //----------------------------------------------Image-----------------------------------------------------//
    //---------------------------------------------Image---------------------------------------------------//
    GetMediaHelper.prototype.UploadImageOnServer = function (FilePath, FileExtention) {
        var _this = this;
        console.log("FilePath", FilePath);
        console.log("FilePath", FileExtention);
        this.isMediaUploading = true;
        this.cdRef.detectChanges();
        var accessToken = this.userData.v_access_token;
        var AuthorizationTemp = 'Bearer ' + accessToken;
        console.log(AuthorizationTemp);
        var headers = new Headers({ 'Accept': 'application/json', 'Authorization': AuthorizationTemp });
        console.log(headers);
        var FileNameWithExtention = new Date().getTime().toString() + '.' + FileExtention;
        console.log(FileNameWithExtention);
        var param = { i_user_id: this.userData.i_user_id };
        var options = {
            headers: headers,
            fileKey: 'v_profile_image',
            fileName: FileNameWithExtention,
            params: param
        };
        console.log(JSON.stringify(options));
        this.fileTransfer.upload(FilePath, this.UploadURL, options, true).then(function (result) {
            console.log(result);
            var JsonParseObj = JSON.parse(result.response);
            _this.modalCtrl.dismiss(JsonParseObj);
        }, function (err) {
            _this.isMediaUploading = false;
            console.log('Error');
            console.log(err);
            _this.modalCtrl.dismiss(false);
        });
        var a = this.fileTransfer.onProgress(function (progressEvent) {
            console.log('Upload Image');
            console.log(progressEvent.loaded);
            var totalProgress = (100 * progressEvent.loaded) / progressEvent.total;
            _this.totalPercentage = parseInt(totalProgress.toString());
            _this.cdRef.detectChanges();
            console.log(_this.totalPercentage + '%');
        });
    };
    GetMediaHelper.prototype.UploadFileCancel = function () {
        this.fileTransfer.abort();
        this.isMediaUploading = false;
        this.cdRef.detectChanges();
        this.modalCtrl.dismiss();
    };
    GetMediaHelper.prototype.CloseModelAction = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GetMediaHelper.prototype, "type", void 0);
    GetMediaHelper = __decorate([
        Component({
            templateUrl: 'get-media-helper.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            Constant, ActionSheetController, Camera, NavParams,
            FileTransfer, ChangeDetectorRef, Platform, ActivatedRoute])
    ], GetMediaHelper);
    return GetMediaHelper;
}());
export { GetMediaHelper };
//# sourceMappingURL=get-media-helper.js.map