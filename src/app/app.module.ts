import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MainApp } from './app.component';

import { HttpModule } from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { Common } from '../providers/common/common';
import { SplitPane } from '../providers/split-pane/split-pane';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Welcome } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MainApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Signup,
    Login,
    Welcome
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MainApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    Signup,
    Login, 
    Welcome
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Common,
    SplitPane
  ]
})
export class AppModule {}
