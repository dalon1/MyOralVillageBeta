import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//let apiUrl = ""
let apiUrl = '';

@Injectable()
export class AuthService {  

  user: Observable<firebase.User>;

  constructor(public http: Http, private auth:AngularFireAuth) {   
    
    this.user = auth.authState;  

  }

  public Login(username:string, password:string){
    this.auth.auth.signInWithEmailAndPassword(username,password).then(res=>console.log(res)).catch(error=> {
      console.log(error.message);
      console.log(error.name);
    });
  }

  public signIn(email:string, password:string){
    this.auth.auth.createUserWithEmailAndPassword(email,password);
    console.dir(firebase.auth().currentUser);
  }
  

  postData(credentials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers:headers})
      .subscribe(res => {
        resolve(res.json());
      }, err => {
        reject(err);
      })
    });
  }
}