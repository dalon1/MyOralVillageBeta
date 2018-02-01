import { Injectable } from "@angular/core";
import { INews } from "../../models/INews";
import { Observable } from "rxjs/Observable";
import { AngularFirestore } from "angularfire2/firestore";
import { FirebaseApp } from "angularfire2";
import { AuthService } from "../auth-service/auth-service";

@Injectable()
export class NewsManager {

    constructor(
        private authService: AuthService,
        private fireBaseApp: FirebaseApp,
        private angularFireStore: AngularFirestore,
        private auth: AuthService
    ) {
        // nothing yet
    }

    getNews() : Observable<INews[]> {
        return this.angularFireStore.collection<INews>('news').valueChanges();
    }

    getNewById(id: string) : Observable<INews> {
        return this.angularFireStore.doc<INews>(`news/${id}`).valueChanges();
    }

    addNews(news: INews) : string {
        // setting the user's id for the respective news
        news.userId = this.auth.afAuth.auth.currentUser.uid;
        news.id = this.angularFireStore.createId();
        this.angularFireStore.collection('news').doc(news.id).set(news).then(function(){
            console.log('sucess saving news');
        }).catch(error => console.log(error));
        return news.id;
    }

    updateNews() {

    }

    deleteNews(id: string) {

    }
}