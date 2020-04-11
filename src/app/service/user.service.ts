import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8080/user"
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post(this.url, user)
  }
}
