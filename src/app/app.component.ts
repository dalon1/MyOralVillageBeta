import { SplitPane } from './../providers/split-pane/split-pane';
import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Welcome } from '../pages/welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MainApp {

  rootPage: any = Welcome;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: App,
    public splitPane: SplitPane,
    public menu: MenuController,
    private auth: AngularFireAuth) {

    const authObserver  = auth.authState.subscribe(user => {
      if (user){
        this.rootPage = TabsPage
        authObserver.unsubscribe();
      } else {
        this.rootPage = Welcome;
        authObserver.unsubscribe();
      }
    });



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout 

    localStorage.clear();
    this.menu.enable(false);
    setTimeout(() => this.backToWelcome(), 1000);

  }
}
