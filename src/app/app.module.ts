import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireAuthModule} from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'; // Dependency not being used.
import { File } from '@ionic-native/file'; // Dependency not being used.
import { Camera } from '@ionic-native/camera'; // Dependency not being used.

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
import { ExternalProfile } from '../pages/profile/external-profile';
import { FilesPage } from '../pages/file-page/files-page';
import { FileAddForm } from '../pages/file-manage/file-add-form';
import { FileDetailPage } from '../pages/file-details/file-details';
import { FileUpload } from '../pages/file-upload/file-upload';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Camera } from '@ionic-native/camera'; npm install --save @ionic-native/core@4.2.0 - current 3.12.1
import { AuthService } from '../providers/auth-service/auth-service';
import { Common } from '../providers/common/common';
import { SplitPane } from '../providers/split-pane/split-pane';
import { DataService } from '../providers/data-service/data-service';
import { FileManager } from '../providers/data-service/file-service';
import { FileCommentManager } from '../providers/data-service/file-comments-service'
import { UserManager } from '../providers/data-service/user-service';
import { NewsManager} from '../providers/data-service/news-service';
import { CountryManager } from '../providers/data-service/country-service';

import { UserIdPipe } from '../utils/pipes/user-id-pipe';

import { LocalSession } from '../providers/session/local-session';

export const firebaseConfig = {
  apiKey: "AIzaSyB36ByzinH0EjOJ6qQmWUNXLN4iVbbCgsA",
  authDomain: "myoralvillage-5f158.firebaseapp.com",
  databaseURL: "https://myoralvillage-5f158.firebaseio.com",
  projectId: "myoralvillage-5f158",
  storageBucket: "myoralvillage-5f158.appspot.com",
  messagingSenderId: "382379836155"
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
    ExternalProfile,
    FileAddForm,
    FilesPage,
    FileDetailPage,
    UserIdPipe,
    FileUpload
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
    ExternalProfile,
    FileAddForm,
    FilesPage,
    FileDetailPage,
    FileUpload
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
    FileCommentManager,
    UserManager,
    NewsManager,
    CountryManager,
    LocalSession
  ]
})
export class AppModule {}
