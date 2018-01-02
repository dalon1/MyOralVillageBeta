import { Injectable } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { AuthService } from '../auth-service/auth-service';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { IComment } from '../../models/IComment';
import { Element } from '../../models/Element';
import { Observable } from 'rxjs/Observable';

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
                    {
                        
                        categories.push(category);
                    }
                );
            }
        }));
        
        console.log(categories);
        
        return categories;
        //return this.createElementList(categories, limit);
    }

    /**
     * TODO: Remove duplicates and sort 
     */
    getTags() : Element[] {
        let tags: Element[] = [];
        this.getFiles().subscribe(files => files.forEach(function(file) {
            if (typeof file.tags != 'undefined' && file.tags instanceof Array) {
                file.tags.forEach(tag =>
                    {
                        let tempTag: Element = new Element(tag);
                        tags.push(tempTag);
                    }
                );
            }
        }));
        // TODO modify list before being returned
        console.log(tags);
        return tags;
        //return this.checkingOccurrences(tags);
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

    addFile(file: IDocument) : string {
        // 1. storing file to firebase
        // TODO add the full path of the file
        let storagePath = `files/${file.name}`;
        //let storageReference = this.fireBaseApp.storage().ref(); -- * --
        //this.uploadTask = storageReference.child(filePath).put(null); -- * --
        
        let storageReference = this.fireBaseApp.storage().ref().child(storagePath);
        storageReference.put(file.file).then(()=> console.log('Actual file uploaded')).catch(error => console.log("DANNEL" + error));
        storageReference.getDownloadURL().then(url => file.url = url).catch(error => console.log(error)); // not needed!
        
        // 2. modifying files properties to be stored
        file.userId = this.authService.afAuth.auth.currentUser.uid;
        storageReference.getMetadata().then(function(metadata) {
            console.log(metadata);
            file.createdAt = metadata.createdAt;
            file.url = metadata.url;
            file.owner = metadata.user;
            file.modifiedAt = metadata.modifiedAt;
            console.log(file);
        }).catch(error => console.log(error));
        //file.name = this.uploadTask.snapshot.-- * --
        file.visibility = file.visibility ? "PRIVATE" : "PUBLIC";
        //file.createdAt = new Date();
        //file.modifiedAt = new Date();

        // 3. storing file's information to fire store
        file.file = null;
        file.id = this.angularFireStore.createId();
        this.angularFireStore.collection('documents').doc(file.id).set(file)
        .then(function(document){
            console.log('success!');
        })
        .catch(function(e){
            console.log(e);
        });
        return file.id;
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

    /**
     * NOTE: There are currently three (3) loops implemented in this method;
     * The first loop goes through all elements of the old list.
     * The second loop checks if the element has been stored in the new list.
     * The third loop counts all occurrences of an element and saves it in the new list.
     * To make the loop faster, elements will be removed from the old list once they are found.
     * @param oldList 
     */
    /*private checkingOccurrences(oldList: Element[]) : Element[] {
        var newList: Element[] = [];
        window.console.log(oldList);
        for (var j = 0; j < oldList.length; j++) {
            let element: Element = oldList[j];
            if (!this.isElementInList(newList, element)) {
                for (var i = 0; i < oldList.length; i++) {
                    if (oldList[i].name === element.name) {
                        element.numOfOccurrence += 1;
                        // TODO implement remove here
                    }
                }
                window.console.log(element);
                newList.push(element);
            }
        }
        return newList;
    }*/

    createElementList(list: string[]) : Element[] {
        let newList : Element[] = [];
        list.forEach(element => {
            if (!this.isElementInList(newList, element)) {
                window.console.log("NOT IN ELEMENT");
                newList.push(this.countOccurrences(list, element));
            }
            window.console.log("IN ELEMENT");
        });
        console.log(list);
        console.log(list.length);
        console.log(newList);
        return newList;
    }

    private countOccurrences(list: string[], value: string) : Element {
        let element: Element = new Element(value);
        window.console.log(list);
        list.forEach(temp => {
            if (temp === element.name) {
                element.numOfOccurrence++;
            }
        });
        return element;
    }

    private isElementInList(list: Element[], element: string): boolean {
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === element) {
                return true;
            }
        }
        return false;
    }

    private deleteElement(list:Element[], element: Element) {
        let index = list.indexOf(element);
        if (index > 1) {
            list.splice(index, 1);
        }
    }

    private count(arr) {
        return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
      }
      
}