import { Injectable } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { AuthService } from '../auth-service/auth-service';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';
/*
     I know there is an existing data service to handle users' profiles.
     The only reason of this class is due to naming convention.
     No DELETE is required and No ADD is required in this provider
*/

@Injectable()
export class UserManager {
    constructor(
        private fireBaseApp: FirebaseApp,
        private angularFireStore: AngularFirestore
    ) {}

    getProfiles()  : Observable<IUser[]> {
        return this.angularFireStore.collection<IUser>('users').valueChanges();
    }

    // Why the Promise<Observable<IUser>> not working? Asking for a then()
    getProfileById(userId: string) : Observable<IUser> {
        return this.angularFireStore.doc<IUser>(`users/${userId}`).valueChanges();
    }

    // TODO Refactor
    getProfilePicture(userId: string) : string {
        // To get the picture profile path
        // IMPORTANT: Make the path flexible for other extensions:
        var url: string;
        this.fireBaseApp.storage().ref().child(`profile-pictures/${userId}.jpg`)
        .getDownloadURL().then(function(url) {
            console.log(url);
            return url;
        }).catch(error => console.log(error));
        console.log(url);
        return url;
    }

    updateProfile(userId: string, description?: string, country?: string) {
        this.angularFireStore.doc(`users/${userId}`).update({
            description: description,
            country: country
        }).then(() => console.log('SUCCESS!')).catch(error => console.log(error));
    }
}