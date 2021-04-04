import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Platform , NavController, MenuController,LoadingController,ModalController,ToastController} from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router :Router,public navCtrl: NavController){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
			console.log(JSON.parse(localStorage.getItem("userData")));
    var authDetail=JSON.parse(localStorage.getItem("userData"));
  	if(authDetail!=null){
  		return true;
  	} else {
			console.log("dfgdg");
			this.navCtrl.navigateRoot('/login');
  	//	this.router.navigate(['login']);
  		return false;
  	}
    
  }
}
