import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { App, ActionSheetController, ViewController, AlertController } from 'ionic-angular';
import { Profile } from './profile';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserManager } from '../../providers/data-service/user-service';
import { CountryManager } from '../../providers/data-service/country-service';
import { IUser } from '../../models/IUser';
import { ICountry } from '../../models/ICountry';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-profile-form',
    templateUrl: 'profile-form.html'
})
export class ProfileForm {
    profileForm;
    profile: Observable<IUser>;
    countries: Observable<ICountry[]>;

    constructor(
        private auth: AuthService,
        private formBuilder : FormBuilder,
        private app: App,
        private userManager: UserManager,
        private countryManager: CountryManager,
        private actionSheetController: ActionSheetController,
        private viewController: ViewController,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.profile = this.userManager.getProfileById(this.auth.afAuth.auth.currentUser.uid);
        this.countries = this.countryManager.getAllCountries();
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
        //this.app.getRootNav().push(Profile);
        this.viewController.dismiss();
    }

    uploadPicture() {
        let actionSheet = this.actionSheetController.create({
            title: 'Profile Picture',
            buttons: [
                {
                    text: 'Open Camera',
                    handler: () => {
                        console.log('Open Camera');
                        this.showPendingFeatureMsg();
                    }

                },
                {
                    text: 'Open Gallery',
                    handler: () => {
                        console.log('Open Gallery');
                        this.showPendingFeatureMsg();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    showPendingFeatureMsg() {
        let alert = this.alertController.create({
            title: 'Pending Feature',
            subTitle: 'Feature not implemented',
            message: 'Feature will be implemented in the upcoming software releases.',
            buttons: ['Ok']
        })
        alert.present();
    }

    dismiss() {
        this.viewController.dismiss();
    }
}