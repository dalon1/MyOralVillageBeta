import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { App, ActionSheetController, ViewController } from 'ionic-angular';
import { Profile } from './profile';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserManager } from '../../providers/data-service/user-service';
import { CountryManager } from '../../providers/data-service/country-service';
import { IUser } from '../../models/IUser';
import { ICountry } from '../../models/ICountry';
import { Observable } from 'rxjs/Observable';
import { LocalSession } from '../../providers/session/local-session';

@Component({
    selector: 'external-profile-page',
    templateUrl: 'external-profile.html'
})
export class ExternalProfile {
    profile: Observable<IUser>;

    constructor(
        private app: App,
        private userManager: UserManager,
        private localSession: LocalSession
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getProfileId() != 'undefined') {
            this.profile = this.userManager.getProfileById(this.localSession.getProfileId());
        }
    }

    
}