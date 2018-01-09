import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { NewsAddForm } from '../news-manage/news-add-form';
import { NewsManager } from '../../providers/data-service/news-service';
import { UserManager } from '../../providers/data-service/user-service';
import { Observable } from 'rxjs/Observable';
import { INews } from '../../models/INews';
import { IUser } from '../../models/IUser';
import { NewsDetailPage } from './news-details';

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
  newsList: Array<NewsViewModel> = new Array<NewsViewModel>();
  
  constructor(
    private app: App,
    private newsManager: NewsManager,
    private userManager: UserManager
  ) {
  }

  ngOnInit() {
    this.loadNews();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  goToNewsDetails(id : string) {
    this.newsManager.newsId = id;
    this.app.getRootNav().push(NewsDetailPage);
  }
  goToNewAddFormPage() {
    this.app.getRootNav().push(NewsAddForm);
  }

  loadNews() {
    this.newsManager.getNews().subscribe((data : Array<INews>) => {
      data.forEach((news: INews) => {
        let user = this.userManager.getProfileById(news.userId).subscribe((user: IUser) => {
          user.avatarUrl = 'https://avatars.io/static/default_128.jpg'; 
          news.createdAt = news.createdAt == null || news.createdAt.toString() == '' ? new Date('2018-01-01') : news.createdAt;  
          this.newsList.push(new NewsViewModel(news, user));
        });
      });
    });
  }

}

class NewsViewModel {
  constructor(
    public news: INews,
    public user: IUser 
  ){}
}