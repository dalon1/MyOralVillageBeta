import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FileAddForm } from '../file-manage/file-add-form';
import { FilesPage } from '../file-page/files-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private app: App,
  ) {

  }

  goToDocumentAddFormPage() {
    this.app.getRootNav().push(FileAddForm);
  }

  goToAll() {
    this.app.getRootNav().push(FilesPage);
  }

}
