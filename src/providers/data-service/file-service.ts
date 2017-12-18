import { Injectable } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { AuthService } from '../auth-service/auth-service';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { IComment } from '../../models/IComment';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class FileManager {
    private user: Observable<IUser>;
    public fileId: string = '';
    
    constructor(
        private authService: AuthService,
        private fireBaseApp: FirebaseApp,
        private angularFireStore: AngularFirestore//,
        //private uploadTask: firebase.storage.UploadTask
    ) {
        this.user = angularFireStore.doc<IUser>(`users/${authService.afAuth.auth.currentUser.uid}`).valueChanges();
        // nothing yet here
    }

    getFiles() : Observable<IDocument[]> { 
        return this.angularFireStore.collection<IDocument>('documents').valueChanges();
    }

    /**
     * TODO: Remove duplicates and sort
     */
    getCategories() : string[] {
        let categories: string[] = [];
        this.getFiles().subscribe(files => files.forEach(function(file) {
            if (typeof file.categories != 'undefined' && file.categories instanceof Array) {
                file.categories.forEach(category =>
                    categories.push(category)
                );
            }
        }));
        return categories;
    }

    /**
     * TODO: Remove duplicates and sort 
     */
    getTags() : string[] {
        let tags: string[] = [];
        this.getFiles().subscribe(files => files.forEach(function(file) {
            if (typeof file.tags != 'undefined' && file.tags instanceof Array) {
                file.tags.forEach(tag =>
                    tags.push(tag)
                );
            }
        }));
        return tags;
    }

    /**
     * TODO: Sort by date (createdAt)!
     * @param id 
     */
    getComments(id: string) : IComment[] {
        let comments: IComment[] = [];
        this.getFileById(id).subscribe(file => {
            if (typeof file.comments != 'undefined' && file.comments instanceof Array) {
                file.comments.forEach(comment => {
                    console.log(comment);
                    comments.push(comment);
                });
            }
        });
        return comments;
    }

    getFileById(id:string) : Observable<IDocument> {
        return this.angularFireStore.doc<IDocument>(`documents/${id}`).valueChanges();
    }

    addFile(file: IDocument) {
        // 1. storing file to firebase
        // TODO add the full path of the file
        let filePath = '/Users/AloniD/move_ws/ionic_ws/MyOralVillageApp/src/providers/data-service/nothing.txt';
        let storagePath = 'files/obama.txt';
        let file1:File = new File([""], 'obama.txt', {type: 'text/plain'});
        //let storageReference = this.fireBaseApp.storage().ref(); -- * --
        //this.uploadTask = storageReference.child(filePath).put(null); -- * --
        
        let fileReference = this.fireBaseApp.storage().ref().child(storagePath);
        fileReference.put(file1).then(()=> console.log('Actual file uploaded')).catch(error => console.log(error));
        fileReference.putString('barack obama');
        fileReference.getDownloadURL().then(url => file.url = url).catch(error => console.log(error)); // not needed!
        
        window.setTimeout(function() { }, 3000);
        // 2. modifying files properties to be stored
        file.userId = this.authService.afAuth.auth.currentUser.uid;
        fileReference.getMetadata().then(function(metadata) {
            file.createdAt = metadata.createdAt;
            file.url = metadata.url;
            file.owner = metadata.user;
            file.modifiedAt = metadata.modifiedAt;
            console.log(file);
        }).catch(error => console.log(error));
        //file.name = this.uploadTask.snapshot.-- * --
        file.visibility = file.visibility ? "PRIVATE" : "PUBLIC";
        file.createdAt = new Date();
        file.modifiedAt = new Date();

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
        this.angularFireStore.collection('documents').doc(id).delete()
        .then(() => console.log('Document deleted')).catch(error => console.log(error));
    }

    /**
     * This will add a comment to the respective file.
     * @param id 
     * @param comment 
     */
    commentFile(id:string, comment: IComment) {
        let comments: IComment[] = this.getComments(id);
        comment.userId = this.authService.afAuth.auth.currentUser.uid;
        // Add current date to comment here>>>
        comments.push(comment);
        this.angularFireStore.doc(`documents/${id}`).update({
            comments: comments
        }).then(() => console.log('Comment added!')).catch(error => console.log(error));
    }
}