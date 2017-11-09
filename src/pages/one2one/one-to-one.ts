import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'page-one-to-one',
  templateUrl: 'one-to-one.html'
})
export class OneToOnePage {
  private user:Observable<IUser>;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private angularFireStore: AngularFirestore) {
      // TODO check if there is a better way to retrieve user info
      this.user = this.angularFireStore.doc<IUser>(`users/${this.authService.afAuth.auth.currentUser.uid}`).valueChanges();
  }

}
