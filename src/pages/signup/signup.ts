import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Login } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  responseData: any;
  userData = { "username": "", "password": "", "email": "", "name": "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private toastCtrl: ToastController) {
  }

  signup(){
    
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.name){

this.authService.signIn(this.userData.email, this.userData.password);

      //API connection
      // this.authService.postData(this.userData, "signup").then(result => {
      //   this.responseData = result;
      //   console.log(this.responseData);
      //   localStorage.setItem('userData', JSON.stringify(this.responseData));
      //   this.navCtrl.push(TabsPage);
      // }, err => {
      //   //Connection failed message
      // })
    } else {
      this.presentToast("Give valid information");
    }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  login(){
    this.navCtrl.push(Login);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
