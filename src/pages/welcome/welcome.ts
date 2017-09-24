import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('userData')){
      this.navCtrl.setRoot(TabsPage);
    }
  }

  login(){
    this.navCtrl.push(Login);
  }

  signup(){
    this.navCtrl.push(Signup, {animate:false});
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
