import { Injectable } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { AuthService } from '../auth-service/auth-service';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileManager {
    private user: Observable<IUser>;
    public fileId: string = '';
    
    constructor(
        private authService: AuthService,
        private fireBaseApp: FirebaseApp,
        private angularFireStore: AngularFirestore
    ) {
        this.user = angularFireStore.doc<IUser>(`users/${authService.afAuth.auth.currentUser.uid}`).valueChanges();
        // nothing yet here
    }

    getFiles() : Observable<IDocument>[] { //: Promise<IDocument[]> {
        //this.angularFireStore.collection('documents').
        //this.angularFireStoreCollection
        /*return this.angularFireStore.collection<IDocument>('documents')
        .add;*/
        return null;
    }

    getFileById(id:string) : Observable<IDocument> {
        return this.angularFireStore.doc<IDocument>(`documents/${id}`).valueChanges();
    }

    addFile(file: IDocument) {
        // 1. storing file to firebase
        // TODO add the full path of the file
        let filePath = 'files/nothing.txt';
        let fileReference =this.fireBaseApp.storage().ref().child(filePath);
        
        fileReference.putString(filePath).then(() => console.log('file uploaded to firebase!')).catch(error => console.log(error));
        //fileReference.getDownloadURL().then(url => file.url = url).catch(error => console.log(error)); // not needed!
        
        window.setTimeout(function() { }, 3000);
        // 2. modifying files properties to be stored
        fileReference.getMetadata().then(function(metadata) {
            file.createdAt = metadata.createdAt;
            file.url = metadata.url;
            file.owner = metadata.user;
            file.modifiedAt = metadata.modifiedAt;
            console.log(file);
        }).catch(error => console.log(error));
        file.visibility = file.visibility ? "PRIVATE" : "PUBLIC";

        // 3. storing file's information to fire store
        let id = this.angularFireStore.createId();
        this.angularFireStore.collection('documents').doc(id).set(file)
        .then(function(document){
            console.log('success!');
        })
        .catch(function(e){
            console.log(e);
        });
        this.fileId = id;
    }

    updateFile() {

    }

    deleteFile(id:string) {
        //this.angularFireStore.collection('documents').
    }
}