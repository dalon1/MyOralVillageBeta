import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { News } from '../news/news';
import { Profile } from '../profile/profile';
import { OneToOnePage } from '../one2one/one-to-one';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = AboutPage;
  tab2Root = OneToOnePage;
  tab3Root = Profile;
  tab4Root = News;

  constructor() {

  }
}
