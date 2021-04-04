import { async } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { webServicenew } from './../../../services/webServicenew';
import { Constant } from './../../../services/constant';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {
  ManageTeamsForm: FormGroup;
  param:any={};
  userData: any;
  hotelId;
  categoryId;
  pageStatus;
  itemDetail:any;

  UserListdata:any;
  editList: any;
  memberdata = [];
  membername: any;


   constructor(private modalCtrl: ModalController,
    public constant: Constant,private router: Router,
    public activatedRoute: ActivatedRoute,private _cdr: ChangeDetectorRef,
    public service: webServicenew, public fb: FormBuilder) {
      console.log("constructor");

      this.userData = this.constant.getUserData();
      this.hotelId = this.constant.HotelId;
      this.editList = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
      console.log("edit data",this.editList);
      
      if(this.editList){
        this.editList.memberData.forEach(item => {
          console.log('Item', item.userId);
          this.membername = item;
          this.memberdata.push(item.userId);
          
        });
        console.log(this.memberdata);


     }
      


    }

    async Fun_GetUserList()
    {
        var manteam = {
          userId: this.userData.userId,
          hotelId: this.hotelId
        };
          this.constant.LoadingPresent();
            this.service.GetUserList(manteam).subscribe((result) => {
              this.constant.LoadingHide();
              if (result.status) {
                this.UserListdata = result.data.userList;
                // console.log(result);
                // this.constant.ToastCustom(result.message, 'top', );
                // this.router.navigate(['/manage-teams']);
              } else {
                this.constant.ToastCustom(result.message, 'top');
                this.constant.LogoutSession(result.status_key);
              }
            }, error => {
              this.constant.Logout(error);
            });
    }

    async ngOnInit() {
      console.log("ngOnInit");
      this.FormValtion();
      await this.Fun_GetUserList();
      // this._cdr.reattach();
      if (this.editList) {
        this.ManageTeamsForm.setValue({
         TeamName: this.editList.teamName,
         SelectMembers: this.memberdata,
         TeamDes: this.editList.description,
        });
      }
      // console.log(`${this.hotelId}`)
      // console.log(this.categoryId);
     
    }

    FormValtion() {
      this.ManageTeamsForm = this.fb.group({
        TeamName: ['', Validators.compose([Validators.required])],
        SelectMembers: ['', Validators.compose([Validators.required])],
        TeamDes: ['', Validators.compose([Validators.required])]
    });
  }
  back(){
    this.router.navigate(['/manage-teams']);
  }

  AddTeam(){
    console.log(this.ManageTeamsForm);
    if(this.ManageTeamsForm.valid){
      var manteam = {
        userId: this.userData.userId,
        hotelId: this.hotelId,
        teamName: this.ManageTeamsForm.value.TeamName,
        members: this.ManageTeamsForm.value.SelectMembers,
        description: this.ManageTeamsForm.value.TeamDes
      };
      console.log(manteam);
      this.constant.LoadingPresent();
      this.service.AddTeamList(manteam).subscribe((result) => {
        this.constant.LoadingHide();
        if (result.status) {
          // console.log(result);
          this.constant.ToastCustom(result.message, 'top', );
          this.router.navigate(['/manage-teams']);
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
    }else{
      this.constant.ToastCustom('All Field Required', 'top');
    }
  }

  EditTeam(){
    console.log(this.ManageTeamsForm);
    if(this.ManageTeamsForm.valid){
      var manteam = {
        userId: this.userData.userId,
        hotelId: this.hotelId,
        teamId: this.editList.teamId,
        teamName: this.ManageTeamsForm.value.TeamName,
        members: this.ManageTeamsForm.value.SelectMembers,
        description: this.ManageTeamsForm.value.TeamDes
      };
      console.log(manteam);
      this.constant.LoadingPresent();
      this.service.EditTeamList(manteam).subscribe((result) => {
        this.constant.LoadingHide();
        if (result.status) {
          // console.log(result);
          this.constant.ToastCustom(result.message, 'top', );
          this.router.navigate(['/manage-teams']);
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
    }else{
      this.constant.ToastCustom('All Field Required', 'top');
    }
  }

}
