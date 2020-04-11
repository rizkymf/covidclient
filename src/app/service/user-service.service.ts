import { Injectable } from '@angular/core';
import { User } from '../model/user'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = "http://localhost:8080/user"
  headers = new HttpHeaders().set('Content-type', 'application/json').set('Accept', 'application/json')
  httpOptions = {
    headers : this.headers
  }
  constructor(private http: HttpClient) { }

  private handleError(error : any){
    console.log(error)
    return throwError(error)
  }

  getUser() : Observable<User[]>{
    return this.http.get<any>(this.url)
  }

  checkUser() : Observable<User>{
    return this.http.get<User>(this.url)
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
    return this.http.delete<User>(this.url).pipe(
      catchError(this.handleError)
    )
  }
}
