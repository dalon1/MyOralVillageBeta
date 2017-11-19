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
import { App, ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'file-add-form',
    templateUrl: 'file-add-form.html'
})
export class FileAddForm {
    private fileForm;
    private document: IDocument;
    private tags: string[] = [];
    private categories: string[] = [];

    constructor(
        private app: App,
        private formBuilder: FormBuilder,
        private fileManager: FileManager,
        private actionSheetController: ActionSheetController
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
            categories: this.formBuilder.control([], Validators.required),
            // control 4 - tags
            tags: this.formBuilder.control([], Validators.required),
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
        if (this.categories.length != 0) {
            formInput.categories = this.categories;
        }

        if (this.tags.length != 0) {
            formInput.tags = this.tags;
        }
        this.fileManager.addFile(formInput);
        this.app.getRootNav().push(FileDetailPage);
    }

    addTags(tag) {
        if (typeof tag === 'undefined') {
            return;
        }
        tag = '#' + tag.trim();// move this DocumentUtils
        if (!this.isElementInList(this.tags, tag)) {
            console.log(tag.trim());
            this.tags.push(tag);
        }
    }

    deleteTag(tag) {
        this.deleteElement(this.tags, tag);
    }

    addCategories(category) {
        if (typeof category === 'undefined') {
            return;
        }
        // move this DocumentUtils
        if (!this.isElementInList(this.categories, category.trim())) {
            console.log(category.trim());
            this.categories.push(category.trim());
        }
    }

    deleteCategory(category) {
        this.deleteElement(this.categories, category);
    }

    selectFileFromExplorer() {
        // this method selects opens the mobile's file explorer
    }

    /**
     * Check if element exists in the list to avoid duplicates.
     * @param list 
     * @param element 
     */
    private isElementInList(list:string[], element:string) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === element) {
                return true;
            }
        }
        return false;
    }

    /**
     * Delete existing element from the respective list.
     * @param list 
     * @param element 
     */
    private deleteElement(list:string[], element: string) {
        let index = list.indexOf(element);
        if (index > -1) {
            list.splice(index, 1);
        }
    }

    attachFile() {
        let actionSheet = this.actionSheetController.create({
            title: 'Upload File',
            buttons: [
                {
                    text: 'Open File Explorer',
                    handler: () => {
                        console.log('Open File Explorer');
                    }

                },
                {
                    text: 'Open Gallery',
                    handler: () => {
                        console.log('Open Gallery');
                    }

                },
                {
                    text: 'Open Camera',
                    handler: () => {
                        console.log('Open Camera');
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
}