import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IComment } from '../../models/IComment';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class FileCommentManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getCommentsByFile(fileId : string) : Observable<IComment[]> {
        return this.angularFireStore.collection<any>('file-comments').doc(fileId).collection<IComment>('comments').valueChanges();
    }

    addCommment(comment : IComment) : void {
        comment.userId = this.authService.afAuth.auth.currentUser.uid;
        comment.createdAt = new Date();
        this.angularFireStore.collection('file-comments').doc(comment.fileId).collection('comments').doc(this.angularFireStore.createId()).set(comment).then(() => console.log('comment added!')).catch(error => console.log(error));
    }
}