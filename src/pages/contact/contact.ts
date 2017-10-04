import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Welcome } from '../welcome/welcome';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
  private auth:AuthService) {

  }

  logout(){
    this.auth.logoutUser();   
  }

}
