import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the SplitPaneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SplitPane {

  public splitPaneState:boolean;

  constructor(public platform:Platform) {
    console.log('Hello SplitPaneProvider Provider');
    this.splitPaneState = false;
  }

  getSplitPane(){
    if (localStorage.getItem('userData')){
      if (this.platform.width() > 850) {
        this.splitPaneState = true;
      } else {
        this.splitPaneState = false;
      }
    } else {
      this.splitPaneState = false;
    } 
    return this.splitPaneState;
  }

}
