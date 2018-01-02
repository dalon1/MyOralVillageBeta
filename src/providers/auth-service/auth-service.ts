import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/IUser';
import { Role } from '../../models/Role';




@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public afFirestore: AngularFirestore) { }

  loginUser(newEmail?: string, newPassword?: string): Promise<any> {
    if (typeof newEmail !== 'undefined' && typeof newPassword !== 'undefined')
      return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
    else
      return this.afAuth.auth.signInAnonymously()
  }

  resetPassword(email: string): Promise<IUser> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<IUser> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string, name: string, role?:Role): Promise<IUser> {
    let newUser: Promise<IUser> = this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    newUser
      .then(() => {
        const usersCollection = this.afFirestore.collection<IUser>('users').doc(this.afAuth.auth.currentUser.uid);
        usersCollection.set({
          id: this.afAuth.auth.currentUser.uid,
          name: name,
          email: newEmail,
          role: role ? role:Role.Member
        })
      });
    return newUser;
  }

}