import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { App } from 'ionic-angular';
import { Profile } from './profile';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserManager } from '../../providers/data-service/user-service';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-profile-form',
    templateUrl: 'profile-form.html'
})
export class ProfileForm {
    profileForm;

    constructor(
        private auth: AuthService,
        private formBuilder : FormBuilder,
        private app: App,
        private userManager: UserManager
    ) {}

    ngOnInit() {
        //let profile = this.userManager.getProfileById(this.auth.afAuth.auth.currentUser.uid);
        this.profileForm = this.formBuilder.group(
            {
                // control 2 - description
                description: this.formBuilder.control(''),
                // control 3 - country
                country: this.formBuilder.control('')
            }
        );
    }

    submitUpdate(profile) {
        this.userManager.updateProfile(this.auth.afAuth.auth.currentUser.uid, profile.description, profile.country);
        this.app.getRootNav().push(Profile);
    }

}