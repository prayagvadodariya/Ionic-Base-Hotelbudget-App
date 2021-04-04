import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { NavController, ModalController, NavParams, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Constant } from "../../services/constant";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router'
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//import { DocumentPicker } from '@ionic-native/document-picker/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
declare let window: any;
// @Component({
//   templateUrl: 'get-media-helper.html',
// })

@Component({
  selector: 'app-get-media-helper',
  templateUrl: './get-media-helper.html',
  styleUrls: ['./get-media-helper.scss'],
})

export class GetMediaHelper {

  ImageBase64: any;
  postEditerMedia = '';
  totalPercentage = 0;
  mediaFrom = '';
  isMediaUploading: boolean = false;
  fileTransfer: FileTransferObject = this.transfer.create();
  userData: any = [];
  UploadURL = ''; param; userId;
  accesstoken: any;
  mm_photo: "";
  ext: any = "";
  page: any;
  // public BASE_URL: string = this.constant.BASE_URL;
  public BASE_URL_NEW: string = this.constant.BASE_URL_NEW;
  @Input() type: any;

  constructor(public modalCtrl: ModalController,
    public constant: Constant, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navParams: NavParams,
    private transfer: FileTransfer, public cdRef: ChangeDetectorRef, public platform: Platform, public activatedRoute: ActivatedRoute,
    private fileChooser: FileChooser, private filePath: FilePath,private filePicker: IOSFilePicker) {
      // private docPicker: DocumentPicker
    this.userData = this.constant.getUserData();
    // console.log(this.userData);

    this.mediaFrom = this.navParams.get('type');
    this.page = this.navParams.get('page');
    // console.log(this.mediaFrom)
    if (this.mediaFrom == 'camera') {
      this.OpenCameara();
    } else if (this.mediaFrom == 'gallery') {
      this.OpenGallery();
    } else if (this.mediaFrom == 'document') {
      if (this.platform.is('android')) {
        //this.OpenAllMedia();
        this.filepickerAndroid();
      } else {
        this.filepickerIos();
      }
    }
  }

  // From CAMERA
  OpenCameara() {

    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    //  const options: CameraOptions = {
    //   quality: 100,
    //   targetWidth: 900,
    //   targetHeight: 600,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   saveToPhotoAlbum: false,
    //   allowEdit: true,
    //   sourceType: 1
    // }

    this.camera.getPicture(options).then((imageData) => {
      console.log('ImageData======>', imageData);
      this.CheckMedeaExtention(imageData);
    }, (err) => {
      // console.log('Camera_Cancel_err=>', err);
      this.modalCtrl.dismiss();
    });

  }

  // From GALLERY
  OpenGallery() {
    const options: CameraOptions = {
      // quality: 100,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // //SAVEDPHOTOALBUM
      // destinationType: this.camera.DestinationType.FILE_URI,
      // encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true,
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //SAVEDPHOTOALBUM
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      targetHeight: 300,
    }

    this.camera.getPicture(options).then((imageData) => {
      // console.log('ImageData=>', imageData);
      this.CheckMedeaExtention(imageData);

    }, (err) => {
      // console.log('Gallery_Cancel_err=>', err);
      this.modalCtrl.dismiss();
    });

  }

  CheckMedeaExtention(mediaPath) {

    //this.mediaPath = mediaPath;

    var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);

    var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);

    this.UploadImageOnServer(FileName, mediaPath, FileExtention);


  }

  filepickerAndroid() {
    var self = this;
    this.fileChooser.open()
      .then(uri => {
        // console.log(uri)
        var uripath = uri;
        window.FilePath.resolveNativePath(uripath, successNative, failNative);

        function failNative(e) {
          // console.error('Houston, we have a big problem :(');
        }

        function successNative(finalPath) {

          //var path = 'file://'+ finalPath;
          // console.log(finalPath)
          self.CheckMediaExtentionForChat(finalPath);
        }

      })
      .catch(e => {
        // console.log(e)
        this.modalCtrl.dismiss();
      });

  }

  filepickerIos() {
    this.filePicker.pickFile()
      .then(uri => {
        // console.log(uri)
        this.CheckMediaExtentionForChat(uri);
      })
      .catch(e => {
        // console.log("error = " + e)
        this.modalCtrl.dismiss();
      });
  }



  // CheckMedeaExtentionCamera(mediaPath) {
  //   var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);
  //   var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);
  //   this.UploadImageOnServer(mediaPath, FileExtention);
  // }
  // CheckMedeaExtention(mediaPath) {
  //   var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);
  //   var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);
  //   var FileName = mediaPath.substring(mediaPath.lastIndexOf('/') + 1, mediaPath.lastIndexOf('?'));
  //   this.UploadImageOnServer(FileName, FileExtention);
  // }

  CheckMediaExtentionForChat(mediaPath) {
    var FileName = mediaPath.substr(mediaPath.lastIndexOf('/') + 1);
    var FileExtention = mediaPath.substring(mediaPath.lastIndexOf('.') + 1);
    // console.log('mediaPath =>', mediaPath)
    var FilenameTemp = new Date().getTime();
    // console.log('FileExtention=>', FileExtention);

    if (FileExtention.toLowerCase() == 'pdf' || FileExtention.toLowerCase() == 'txt' || FileExtention.toLowerCase() == 'docx' || FileExtention.toLowerCase() == 'doc' || FileExtention.toLowerCase() == 'xls' || FileExtention.toLowerCase() == 'xlsx') {
      //this.UploadImageOnServerChat(mediaPath, FileExtention);
      this.UploadImageOnServer(FileName, mediaPath, FileExtention);
    } else {
      if (mediaPath == 'file://' || mediaPath == 'file://null') {
        this.constant.ToastCustom("Please select file from local directory.", 'top',);
      } else {
        this.constant.ToastCustom("Please select Doc, Pdf,Excel or Text file type", 'top',);
      }

      this.modalCtrl.dismiss();
    }

  }

  //----------------------------------------------Image-----------------------------------------------------//
  //---------------------------------------------Image---------------------------------------------------//


  UploadImageOnServer(FileName, FilePath, FileExtention) {

    this.isMediaUploading = true;
    this.cdRef.detectChanges();

    var accessToken = JSON.parse(localStorage.getItem('v_access_token'));
    var AuthorizationTemp = 'Bearer ' + accessToken;
    let headers = new Headers({ 'Accept': 'application/json', 'Authorization': AuthorizationTemp });

    var URL = '';
    if (this.page == 'edit_profile') {
      URL = this.BASE_URL_NEW + 'user/updateProfile';
      this.param = { 'userId': this.userData.userId};

      var options: FileUploadOptions = {
        headers: headers,
        fileKey: 'profileimg',
        params: this.param,
      };
      // console.log("image upload->>>");
    } else if(this.page == 'HelpPage') {
      console.log("image upload->>> HelpPage");
      URL = this.BASE_URL_NEW + 'cutomer-support/uploadImage';
      this.param = { 'userId': this.userData.userId};

      var options: FileUploadOptions = {
        headers: headers,
        fileKey: 'attachmentFile',
        params: this.param,
      };
    }

    // console.log(URL);
    // console.log(options);

    this.fileTransfer.upload(FilePath, URL, options, true).then((result) => {
      // console.log(result);

      var JsonParseObj = JSON.parse(result.response);

      this.modalCtrl.dismiss({ JsonParseObj: JsonParseObj, FilePath: FilePath, FileName: FileName });
    }, (err) => {
      this.isMediaUploading = false;
      console.log(err)
      // console.log('Error');

    })

    var a = this.fileTransfer.onProgress((progressEvent: ProgressEvent) => {
      var totalProgress = (100 * progressEvent.loaded) / progressEvent.total;
      this.totalPercentage = parseInt(totalProgress.toString());
      this.cdRef.detectChanges();
    });

  }


  UploadFileCancel() {

    this.fileTransfer.abort();
    this.isMediaUploading = false;
    this.cdRef.detectChanges();
    this.modalCtrl.dismiss();
  }

  CloseModelAction() {
    this.modalCtrl.dismiss();
  }


}
