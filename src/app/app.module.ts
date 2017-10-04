import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireAuthModule} from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { MainApp } from './app.component';

import { HttpModule } from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Welcome } from '../pages/welcome/welcome';
import { News } from '../pages/news/news';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Profile } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { Common } from '../providers/common/common';
import { SplitPane } from '../providers/split-pane/split-pane';


export const firebaseConfig = {
  apiKey: "AIzaSyBvuJU6mVWFm8CuS_bPHoHlZ0rLcaEkov4",
  authDomain: "myoralvillage-b7c6a.firebaseapp.com",
  databaseURL: "https://myoralvillage-b7c6a.firebaseio.com",
  projectId: "myoralvillage-b7c6a",
  storageBucket: "",
  messagingSenderId: "662357186353"
}


@NgModule({
  declarations: [
    MainApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Signup,
    Login,
    Welcome,
    News,
    ResetPassword,
    Profile
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MainApp),    
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
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
    Welcome,
    News,
    ResetPassword,
    Profile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Common,
    SplitPane,
    AngularFireModule
  ]
})
export class AppModule {}
