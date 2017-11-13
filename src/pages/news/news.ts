import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { NewsAddForm } from '../news-manage/news-add-form';
import { NewsManager } from '../../providers/data-service/news-service';
import { Observable } from 'rxjs/Observable';
import { INews } from '../../models/INews';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class News {
  private news : Observable<INews[]>;
  
  constructor(
    private app: App,
    private newsManager: NewsManager
  ) {
    this.news = this.newsManager.getNews();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  goToNewAddFormPage() {
    this.app.getRootNav().push(NewsAddForm);
  }

}
