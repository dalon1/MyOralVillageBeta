import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Welcome } from '../welcome/welcome';
import { DataService } from '../../providers/data-service/data-service';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

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

  constructor(public navCtrl: NavController,
    private auth: AuthService,
    private db: DataService,
    private app: App,
    private afs:AngularFirestore) {
      this.userDoc = afs.doc<IUser>(`users/${auth.afAuth.auth.currentUser.uid}`);
      this.user = this.userDoc.valueChanges();
  }



  logout() {
    this.auth.logoutUser();
    let mainNav = this.app.getRootNav();
    mainNav.push(Welcome);
  }

  ionViewDidLoad() {
     
  }

}
