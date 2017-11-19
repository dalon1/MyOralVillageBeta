import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../../models/IDocuments';
import { FileManager } from '../../providers/data-service/file-service';

@Component({
    selector: 'files-page',
    templateUrl: 'files-page.html'
})
export class FilesPage {
    files: Observable<IDocument[]>;
    categories: string[];
    tags: string[];

    constructor(
        private fileManager: FileManager
    ) {
        this.files = this.fileManager.getFiles();
        this.categories = this.fileManager.getCategories();
        this.tags = this.fileManager.getTags();
    }
}