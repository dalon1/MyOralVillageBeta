import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {  } from 'angularfire2';
import 'rxjs/add/operator/map';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: Http, ) {
    console.log('Hello DatabaseProvider Provider');
  }

}
