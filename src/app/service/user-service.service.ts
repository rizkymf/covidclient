import { Injectable } from '@angular/core';
import { User } from '../model/user'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { tap, catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = "http://localhost:8080/user"
  headers = new HttpHeaders().set('Content-type', 'application/json').set('Accept', 'application/json')
  httpOptions = {
    headers : this.headers
  }
  // user: User

  constructor(private http: HttpClient) { }

  private handleError(error : any){
    console.log(error)
    return throwError(error)
  }

  getUser() : Observable<User[]>{
    return this.http.get<any>(this.url).pipe(
      tap(data => console.log(data),
      catchError(this.handleError)
      )
    )
  }

  addUser(user : User) : Observable<User>{
    user.idUser = null
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
      )
  }

  updateUser(user: User) : Observable<User>{
    const url = `${this.url}/${user.idUser}`
    return this.http.put<User>(this.url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    )
  }

  deleteUser(id : number) : Observable<User>{
    const url = `${this.url}/${id}`
    return this.http.delete<User>(url).pipe(
      catchError(this.handleError)
    )
  }

  public checkUser(user) : Observable<User>{
    return this.http.post<User>(this.url + "/login", user)
  }
}
