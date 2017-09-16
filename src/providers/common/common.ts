import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Common {
  public loader: any;
  constructor(public loadingCtrl:LoadingController) {
    console.log('Hello CommonProvider Provider');
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:'Please wait...'
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

}
