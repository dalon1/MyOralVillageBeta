import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.html',
})
export class FileUpload {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public onFileFromStorageChosen(filesEvent: any) {
    this.processFileFromStorage(filesEvent);
  }

  public processFileFromStorage(event: any) {
    let file = event.target.files[0];
    //you can read various properties of the file (like mimetype and size) from the file object.
    console.log(file);
    this.readfile(file);
 }

//this one reads the contents of the file as a URL that contains its data:

  public readfile(file: any): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      let dataUrl = reader.result;
      //and do something with the reader.
    };
    reader.readAsDataURL(file);
  }
}
