import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../../models/IDocuments';
import { IUser } from '../../models/IUser';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Validators, FormBuilder } from '@angular/forms';
import { FileManager } from '../../providers/data-service/file-service';
import { FileDetailPage } from '../file-details/file-details';
import { App } from 'ionic-angular';

@Component({
    selector: 'file-add-form',
    templateUrl: 'file-add-form.html'
})
export class FileAddForm {
    private fileForm;
    private document: IDocument;

    constructor(
        private app: App,
        private formBuilder: FormBuilder,
        private fileManager: FileManager
    ) {

    }

    ngOnInit() {
        this.fileForm = this.formBuilder.group({
            // control 1 - name
            title: this.formBuilder.control('', Validators.compose([
                Validators.required
            ])),
            // control 2 - description
            description: this.formBuilder.control(''),
            // control 3 - category
            categories: this.formBuilder.control('', Validators.compose([
                Validators.required
            ])),
            // control 4 - tags
            tags: this.formBuilder.control('', Validators.compose([
                Validators.required
            ])),
            // control 5 - visibility
            visibility: this.formBuilder.control('', Validators.compose([
                
            ])),
            owner: '',
            createdAt: '',
            modifiedAt: '',
            url: ''
        })
    }

    uploadFile(formInput:IDocument) {
        this.fileManager.addFile(formInput);
        this.app.getRootNav().push(FileDetailPage);
    }

    addTags(inputTag) {
        window.alert("tag name: " + inputTag);
        /*let tag = this.documentForm.tags;
        if (tag != null && tag != '') {
            
            this.document.tags.push('#' + tag);
        }*/
    }

    selectFileFromExplorer() {
        // this method selects opens the mobile's file explorer
    }
}