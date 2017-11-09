import { Component } from '@angular/core';
import { IDocument } from '../../models/IDocuments';
import { Observable } from 'rxjs/Observable';
import { FileManager } from '../../providers/data-service/file-service';

@Component({
    selector: 'file-details-page',
    templateUrl: 'file-details.html'
})
export class FileDetailPage {
    private document: Observable<IDocument>;

    constructor(
        private fileManager: FileManager
    ) {
        
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