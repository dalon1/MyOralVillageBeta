import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable  } from 'rxjs/Observable';
import { IUser } from '../../models/IUser';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DataService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  private userDoc: AngularFirestoreDocument<IUser>;
  private items: Observable<Document[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<IUser>('users');  
    // this.usersCollection.ref.where('name','==', 'Ted').get()
    //   .then(snapShot => {
    //     snapShot.forEach(user =>{
    //       console.log(user.id, "=>", user.data);
    //     })
    //   }); 

    
     
    // this.userDoc = afs.doc<User>('users/45hzgSA6qKMG7ydYwT2e');
    // this.items = this.userDoc.collection<Document>('documents').valueChanges();  
  }

  addUser(user:IUser){
    this.usersCollection.add(user);
  }
}
