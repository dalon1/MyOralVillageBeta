import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { FileAddForm } from '../file-manage/file-add-form';
import { FileDetailPage } from '../file-details/file-details';
import { FilesPage } from '../file-page/files-page';

import { FileManager } from '../../providers/data-service/file-service';
import { UserManager } from '../../providers/data-service/user-service';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../../models/IDocuments';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FileUpload } from '../file-upload/file-upload';
import { LocalSession } from '../../providers/session/local-session';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  documentList: Array<FeedViewModel> = new Array<FeedViewModel>();
  canUploadFiles: boolean = false;

  constructor(
    public navCtrl: NavController,
    private app: App,
    private fileManager: FileManager,
    private userManager: UserManager,
    private authManager: AuthService,
    private alertController: AlertController,
    private localSession: LocalSession) {     

      this.documentList = this.loadFiles();
      this.setUploadVisible();
         
  }

  goToDocumentAddFormPage() {
    this.app.getRootNav().push(FileAddForm);
  }

  goToAll() {
    this.app.getRootNav().push(FilesPage);
  }

  temp() {
    var keyword = "can";
    if (keyword && keyword.trim() != '') {
      this.documentList.filter((model) => {
        if (model.document.title.toLowerCase().includes(keyword.toLowerCase())) {
          console.log("true");
        } else {
          console.log("false");
        }
        return model.document.title.toLowerCase().includes(keyword.toLowerCase());
      })
       console.log(this.documentList.length);
    }
  }

  setUploadVisible(){    
    if(this.authManager.afAuth.auth.currentUser == null){
      this.canUploadFiles = false;
    } else {
      if(this.authManager.afAuth.auth.currentUser.isAnonymous){
        this.canUploadFiles = false;
      }else 
      this.canUploadFiles = true;
    }
    
  }

  goToFileDetails(id : string) {
    this.localSession.setFileId(id);
    this.app.getRootNav().push(FileDetailPage);
  }

  searchFile(event) {
    var keyword = event.target.value;

    if (keyword && keyword.trim() != '') {
      keyword = keyword.toLowerCase();
      this.documentList = this.documentList.filter((model) => {
        return (
          // search by title
          model.document.title.toLowerCase().includes(keyword) ||
          // search by category >> exact spelling or includes????? Currently: exact spelling
          model.document.categories.map(category => category.toLowerCase().includes(keyword)).indexOf(true) > -1 ||
          // search by tag >> 
          model.document.tags.map(tag => tag.toLowerCase().includes(keyword)).indexOf(true) > -1 ||
          // search by user name
          model.user.name.toLowerCase().includes(keyword)
        );
      });
    } else {
      // reset back all documents when search is empty
      this.documentList = this.loadFiles();
    }
  }

  loadFiles() : Array<FeedViewModel> {
    let docList : Array<FeedViewModel> = new Array<FeedViewModel>();
    this.fileManager.getFiles().subscribe((data : Array<IDocument>) => {
      data.forEach( (doc: IDocument) => {                    
        let user = this.userManager.getProfileById(doc.userId).subscribe((user:IUser) => {     
          // this avatar URL is making exceptions
            //user.avatarUrl = user.avatarUrl == null || user.avatarUrl == '' ? 'https://avatars.io/static/default_128.jpg' : user.avatarUrl;
            user.avatarUrl = 'https://avatars.io/static/default_128.jpg';    
            doc.modifiedAt = doc.modifiedAt == null || doc.modifiedAt.toString() == '' ? new Date('2017-01-01') : doc.modifiedAt;            
            
            let model = new FeedViewModel(doc,user);
            docList.push(model);              
        });
      });        
    });  
    return docList; 
  }

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

 class FeedViewModel {
  constructor(   
    public document:IDocument,
    public user:IUser
  ){} 
}
