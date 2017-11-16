import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { App } from 'ionic-angular';
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
    private commentForm;

    constructor(
        private fileManager: FileManager,
        private formBuilder: FormBuilder,
        private app: App
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

    deleteFile() {
        // nothing yet
        if (typeof this.fileManager.fileId != 'undefined') {
            this.fileManager.deleteFile(this.fileManager.fileId);
            // TODO fix this >> 
            this.app.getActiveNav().push(HomePage);
            //this.app.getRootNav().push(HomePage);
        }
    }

    // fix this as well with a form builder 
    commentFile(comment: IComment) {
        if (typeof this.fileManager.fileId != 'undefined') {
            this.fileManager.commentFile(this.fileManager.fileId, comment);
        }
    }

}