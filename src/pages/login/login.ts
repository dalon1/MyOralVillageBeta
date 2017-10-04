import { TabsPage } from './../tabs/tabs';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  responseData: any;
  userData = { "username": "", "password": "" };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    private toastCtrl: ToastController    
  ) {
  }

  login(){
    
    this.authService.Login(this.userData.username, this.userData.password);
    debugger;
    this.navCtrl.push(TabsPage);
  }

  // login() {
  loginMock() {
    if (this.userData.username && this.userData.password) {
      this.authService.postData(this.userData, "login").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.userData) {
          localStorage.setItem('userData', JSON.stringify(this.responseData))
          this.navCtrl.push(TabsPage);
        }
        else {
          this.presentToast("Please give valid username and password");
        }



      }, (err) => {
        //Connection failed message
        this.presentToast('Connection cannot be estabilished. Try again in a few minutes');
      });
    }
    else {
      this.presentToast("Give username and password");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
