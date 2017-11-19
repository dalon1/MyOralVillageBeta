import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireAuthModule} from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { MainApp } from './app.component';

import { HttpModule } from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OneToOnePage } from '../pages/one2one/one-to-one';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Welcome } from '../pages/welcome/welcome';
import { News } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news/news-details';
import { NewsAddForm } from '../pages/news-manage/news-add-form';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Profile } from '../pages/profile/profile';
import { ProfileForm } from '../pages/profile/profile-form';
import { FilesPage } from '../pages/file-page/files-page';
import { FileAddForm } from '../pages/file-manage/file-add-form';
import { FileDetailPage } from '../pages/file-details/file-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Camera } from '@ionic-native/camera'; npm install --save @ionic-native/core@4.2.0 - current 3.12.1
import { AuthService } from '../providers/auth-service/auth-service';
import { Common } from '../providers/common/common';
import { SplitPane } from '../providers/split-pane/split-pane';
import { DataService } from '../providers/data-service/data-service';
import { FileManager } from '../providers/data-service/file-service';
import { UserManager } from '../providers/data-service/user-service';
import { NewsManager} from '../providers/data-service/news-service';

import { UserIdPipe } from '../utils/pipes/user-id-pipe';

export const firebaseConfig = {
  apiKey: "AIzaSyBvuJU6mVWFm8CuS_bPHoHlZ0rLcaEkov4",
  authDomain: "myoralvillage-b7c6a.firebaseapp.com",
  databaseURL: "https://myoralvillage-b7c6a.firebaseio.com",
  projectId: "myoralvillage-b7c6a",
  storageBucket: "myoralvillage-b7c6a.appspot.com",
  messagingSenderId: "662357186353"
}


@NgModule({
  declarations: [
    MainApp,
    AboutPage,
    HomePage,
    TabsPage,
    OneToOnePage,
    Signup,
    Login,
    Welcome,
    News,
    NewsDetailPage,
    NewsAddForm,
    ResetPassword,
    Profile,
    ProfileForm,
    FileAddForm,
    FilesPage,
    FileDetailPage,
    UserIdPipe
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MainApp),    
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,    
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MainApp,
    AboutPage,
    HomePage,
    TabsPage,
    OneToOnePage, 
    Signup,
    Login, 
    Welcome,
    News,
    NewsDetailPage,
    NewsAddForm,
    ResetPassword,
    Profile,
    ProfileForm,
    FileAddForm,
    FilesPage,
    FileDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Common,
    SplitPane,
    AngularFireModule,
    DataService,
    FileManager,
    UserManager,
    NewsManager
  ]
})
export class AppModule {}
