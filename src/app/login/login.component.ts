import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from './login'
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  private formBuilder: FormBuilder;
  private route: Router;
  private authService: AuthenticationService;

  users : User[] = [];
  user : User;
  userCheck : User;
  userFormGroup : FormGroup;
  idToDelete : number;
  check : boolean;

  login = new Login();

  constructor(private service : UserServiceService) { 
      service.getUser().subscribe(
          result => this.users = result,
          err => console.log("Ada error nich : " + JSON.stringify(err)),
          () => console.log("done!")
      )
   }
  addUsers(){
    this.service.addUser(this.userFormGroup.value).subscribe(data => {
        this.user = data;
    })
}

getUsers(){
    this.service.getUser().subscribe( dataUser => {
        this.users = dataUser;
    })
}

checkUser(uname: string, pwd: string){
    this.service.checkUser().subscribe( check => {
        this.userCheck = check;
    })
    if(this.userCheck.nama === ""){
        this.login.isLogout();
    } else {
        this.login.isLogin();
    }
}

deleteUser(){
    this.service.deleteUser(this.idToDelete).subscribe(data => {
        this.getUsers();
    })
}

  ngOnInit() {
  }

}
