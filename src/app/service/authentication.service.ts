import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
// import { userInfo } from 'os';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value
  }

  login(uname:string, pwd: string){
    return this.http.post<any>(`auth/login`, {uname, pwd}).pipe(map(user => {
      if(user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user.result))
        this.currentUserSubject.next(user)
      }
      return user
    }
    ))
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }
}
