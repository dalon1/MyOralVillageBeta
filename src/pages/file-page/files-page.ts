import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDocument } from '../../models/IDocuments';
import { Element } from '../../models/Element';
import { FileManager } from '../../providers/data-service/file-service';
import { FileDetailPage } from '../file-details/file-details';
import { ExternalProfile } from '../profile/external-profile';
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
    users: Array<UserViewModel>;

    constructor(
        private app: App,
        private fileManager: FileManager,
        private userManager: UserManager
    ) {
        this.documentList = this.loadFiles();
        this.users = this.loadUsers();
        this.categories = this.fileManager.getCategories();
        this.tags = this.fileManager.getTags();
    }

    searchEverything(event) {
        var keyword = event.target.value;
        if (keyword && keyword.trim() != '') {
            keyword = keyword.toLowerCase();
            this.categories = this.categories.filter((category) => {
                return category.name.toLowerCase().includes(keyword);
            });
            this.tags = this.tags.filter((tag) => {
                return tag.name.toLowerCase().includes(keyword);
            })
            this.users = this.users.filter((model) => {
                return (
                    // search by name
                    model.user.name.toLowerCase().includes(keyword) ||
                    // search by role
                    model.user.role.toLowerCase().includes(keyword)
                    // search by country >> PENDING
                );
            });
            this.documentList = this.documentList.filter((model) => {
                return (
                    // search by title
                    model.document.title.toLowerCase().includes(keyword) ||
                    // search by user profile
                    model.user.name.toLowerCase().includes(keyword) ||
                    // search by category
                    model.document.categories.map(category => category.toLowerCase().includes(keyword)).indexOf(true) > -1 ||
                    // search by tag
                    model.document.tags.map(tag => tag.toLowerCase().includes(keyword)).indexOf(true) > -1
                );
            });
        } else {
            // reset everything back to orginal state
            this.categories = this.fileManager.getCategories();
            this.tags = this.fileManager.getTags();
            this.documentList = this.loadFiles();
            this.users = this.loadUsers();
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
                this.documentList.push(model);              
            });
          });        
        });
        return docList;
      }

    loadUsers() : Array<UserViewModel> {
        let userList : Array<UserViewModel> = new Array<UserViewModel>();
        this.userManager.getProfiles().subscribe((data : Array<IUser>) => {
            data.forEach((user : IUser) => {
                userList.push(new UserViewModel(user));
            });
        });
        return userList;
    }
    
    goToFileDetails(id : string) {
        this.fileManager.fileId = id;
        this.app.getRootNav().push(FileDetailPage);
    }

    goToExternalProfile(id : string) {
        this.userManager.profileId = id;
        this.app.getRootNav().push(ExternalProfile);
    }

    private createElementList(list: string[]) : Element[] {
        let newList : Element[] = [];
        list.forEach(element => {
            if (!this.isElementInList(newList, element)) {
                window.console.log("NOT IN ELEMENT");
                newList.push(this.countOccurrences(list, element));
            }
            window.console.log("IN ELEMENT");
        });
        console.log(list);
        console.log(list.length);
        console.log(newList);
        return newList;
    }

    private countOccurrences(list: string[], value: string) : Element {
        let element: Element = new Element(value);
        window.console.log(list);
        list.forEach(temp => {
            if (temp === element.name) {
                element.numOfOccurrence++;
            }
        });
        return element;
    }

    private isElementInList(list: Element[], element: string): boolean {
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === element) {
                return true;
            }
        }
        return false;
    }
}

class FeedViewModel {
    constructor(   
      public document:IDocument,
      public user:IUser
    ){} 
  }

class UserViewModel {
    constructor(public user: IUser) {}
}