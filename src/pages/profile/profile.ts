import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Welcome } from '../welcome/welcome';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  constructor(public navCtrl: NavController,
    private auth:AuthService,
    private app:App) {
  
    }
  
    logout(){
      this.auth.logoutUser();   
      let mainNav = this.app.getRootNav();
      mainNav.push(Welcome);     
    }

  ionViewDidLoad() {
    
  }

}
