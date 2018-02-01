import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { App, AlertController, ToastController, NavController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IDocument } from '../../models/IDocuments';
import { IComment } from '../../models/IComment';
import { Observable } from 'rxjs/Observable';
import { FileManager } from '../../providers/data-service/file-service';

@Component({
    selector: 'file-details-page',
    templateUrl: 'file-details.html'
})
export class FileDetailPage {
    private selectedFile: Observable<IDocument>;
    private temp: IDocument;
    private commentForm;

    constructor(
        private fileManager: FileManager,
        private formBuilder: FormBuilder,
        private app: App,
        public navCtrl: NavController,
        private alertController: AlertController,
        private toastController: ToastController,
        private actionSheetController: ActionSheetController
    ) {
        // TODO A better approach should be implemented here...
        if (typeof this.fileManager.fileId != 'undefined') {
            this.selectedFile = this.fileManager.getFileById(this.fileManager.fileId);
            console.log(this.selectedFile);
        }
    }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            comment: this.formBuilder.control('', Validators.required)
        })
    }


    updateFile() {
        // nothingyet
        this.fileManager.updateFile();
    }

    showDeleteFileAlert() {
        let confirm = this.alertController.create({
            title: 'Deleting File',
            message: 'Are you sure you want to delete this file?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: ()=> {
                        this.deleteFile();
                    } 
                }
            ]
        });
        confirm.present();
    }

    private deleteFile() {
        // nothing yet
        if (typeof this.fileManager.fileId != 'undefined') {
            this.fileManager.deleteFile(this.fileManager.fileId);
            this.navCtrl.popToRoot();
        }
    }

    // fix this as well with a form builder 
    commentFile(comment: IComment) {
        if (typeof this.fileManager.fileId != 'undefined') {
            this.fileManager.commentFile(this.fileManager.fileId, comment);
            this.showCommentMessage();
        }
    }

    private showCommentMessage() {
        let toast = this.toastController.create({
            message: 'Your comment was added!',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    downloadFile(name: string) {
        this.fileManager.downloadFile(name);
    }

    fileActions() {
        let actionSheet = this.actionSheetController.create({
            title: 'Modify File',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log('File Deleted!');
                        this.showDeleteFileAlert();
                    }

                },
                {
                    text: 'Update File',
                    handler: () => {
                        console.log('Update File Form Called');
                        this.showPendingFeatureMsg();
                    }

                },
                {
                    text: 'Download File',
                    handler: () => {
                        console.log('Download File called!');
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
    

    /*loadFile(id: string) : IDocument {
        let temp = this.fileManager.getFileById(id).subscribe((data:IDocument) =>{
            new DetailView(temp);
        });
    }*/

    showPendingFeatureMsg() {
        let alert = this.alertController.create({
            title: 'Pending Feature',
            subTitle: 'Feature not implemented',
            message: 'Feature will be implemented in the upcoming software releases.',
            buttons: ['Ok']
        })
        alert.present();
    }
}

class DetailView {
    constructor(
        public document : IDocument
    ) {}
}