import { Component } from '@angular/core';
import { App, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Welcome } from '../welcome/welcome';
import { Signup } from '../signup/signup';
import { ProfileForm } from './profile-form';
import { DataService } from '../../providers/data-service/data-service';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { UserManager } from '../../providers/data-service/user-service';

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

  private userDoc: AngularFirestoreDocument<IUser>;
  private user:Observable<IUser>;
  private picturePath: string;

  constructor(public navCtrl: NavController,
    private modalController: ModalController,
    private auth: AuthService,
    private userManager: UserManager,
    private app: App,
    private fireBaseApp: FirebaseApp) {
      let userId = this.auth.afAuth.auth.currentUser.uid;
      this.user = this.userManager.getProfileById(userId);
      //this.picturePath = this.userManager.getProfilePicture(userId);
      this.fireBaseApp.storage().ref().child(`profile-pictures/${userId}.jpg`)
      .getDownloadURL().then(url => this.picturePath = url).catch(error => console.log(error));
  }



  logout() {
    this.auth.logoutUser();
    let mainNav = this.app.getRootNav();
    mainNav.push(Welcome);
  }

  ionViewDidLoad() {
     
  }

  /*
  * Method to update user's profile
  */
  updateProfile() {
    //this.app.getRootNav().push(ProfileForm);
    this.modalController.create(ProfileForm).present();
  }

  signUpFromGuestPage() {
    this.app.getRootNav().push(Signup);
  }
}
