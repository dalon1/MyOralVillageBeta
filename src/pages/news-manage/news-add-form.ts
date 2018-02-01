import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { App } from 'ionic-angular';
import { News } from '../news/news';
import { NewsManager } from '../../providers/data-service/news-service';
import  { INews } from '../../models/INews';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LocalSession } from '../../providers/session/local-session';
@Component({
  selector: 'news-add-form',
  templateUrl: 'news-add-form.html',
})
export class NewsAddForm {
  private newsForm;

  constructor(
    private newsManager: NewsManager,
    private formBuilder: FormBuilder,
    private app: App,
    private localSession: LocalSession
  ) {
  }

  ngOnInit() {
    this.newsForm = this.formBuilder.group({
      // control 1 - title
      title: this.formBuilder.control('', Validators.required),
      // control 2 - content
      content: this.formBuilder.control('', Validators.required),
      // control 3 - type
      type: this.formBuilder.control('', Validators.required),
      // control 4 - url
      url: this.formBuilder.control('', )
    })
  }

  uploadNews(formInput: INews) {
    console.log("news added success!");
    this.localSession.setNewsId(this.newsManager.addNews(formInput));
    this.app.getRootNav().push(News);
  }
}
