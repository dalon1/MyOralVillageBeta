import { Component } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { Observable } from 'rxjs/Observable';
import { FileManager } from '../../providers/data-service/file-service';

@Component({
    selector: 'file-details-page',
    templateUrl: 'file-details.html'
})
export class FileDetailPage {
    private selectedFile: Observable<IDocument>;

    constructor(
        private fileManager: FileManager
    ) {
        // TODO A better approach should be implemented here...
        if (typeof this.fileManager.fileId != 'undefined') {
            this.selectedFile = this.fileManager.getFileById(this.fileManager.fileId);
            console.log(this.selectedFile);
        }
    }

    updateFile() {
        // nothingyet
        this.fileManager.updateFile();
    }

    deleteFile() {
        // nothing yet
        this.fileManager.deleteFile('');
    }

}