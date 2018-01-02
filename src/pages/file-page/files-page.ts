import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../../models/IDocuments';
import { Element } from '../../models/Element';
import { FileManager } from '../../providers/data-service/file-service';
import { FileDetailPage } from '../file-details/file-details';
import { IUser } from '../../models/IUser';
import { UserManager } from '../../providers/data-service/user-service';
import { App } from 'ionic-angular';

@Component({
    selector: 'files-page',
    templateUrl: 'files-page.html'
})
export class FilesPage {
    documentList: Array<FeedViewModel>;
    categories: Element[];
    tags: Element[];
    users: Observable<IUser[]>;

    constructor(
        private app: App,
        private fileManager: FileManager,
        private userManager: UserManager
    ) {
        this.documentList = new Array<FeedViewModel>();
        this.users = this.userManager.getProfiles();
        this.loadFiles();
        this.categories = this.fileManager.createElementList(this.fileManager.getCategories());
        this.tags = this.fileManager.getTags();
    }

    loadFiles() {
        this.fileManager.getFiles().subscribe((data : Array<IDocument>) => {
          data.forEach( (doc: IDocument) => {                    
            let user = this.userManager.getProfileById(doc.userId).subscribe((user:IUser) => {     
              // this avatar URL is making exceptions
                //user.avatarUrl = user.avatarUrl == null || user.avatarUrl == '' ? 'https://avatars.io/static/default_128.jpg' : user.avatarUrl;
                user.avatarUrl = 'https://avatars.io/static/default_128.jpg';    
                doc.modifiedAt = doc.modifiedAt == null || doc.modifiedAt.toString() == '' ? new Date('2017-01-01') : doc.modifiedAt;            
                
                let model = new FeedViewModel(doc,user);
                this.documentList.push(model);              
            });
          });        
        });   
      }
    
    goToFileDetails(id : string) {
        this.fileManager.fileId = id;
        this.app.getRootNav().push(FileDetailPage);
    }
}

class FeedViewModel {
    constructor(   
      public document:IDocument,
      public user:IUser
    ){} 
  }