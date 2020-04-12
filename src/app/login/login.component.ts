import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login'
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpParams } from '@angular/common/http';
import { Form } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  users : User[] = []
  user : User
  userCheck : User
  loginForm : FormGroup
  idToDelete : number
  check : boolean
  invalidLogin: boolean = false
  uname = ""
  pwd = ""
  login = new Login();

  constructor(private formBuilder: FormBuilder, private router: Router, private service : UserServiceService) { 
      service.getUser().subscribe(
          result => this.users = result,
          err => console.log("Ada error nich : " + JSON.stringify(err)),
          () => console.log("done!")
      )
   }
   onSubmit(){
       if(this.loginForm.invalid){
           return
       }
       this.service.checkUser(this.uname, this.pwd).subscribe((res:any) => {
           this.user = res,
        //    err => this.login.isLogout(),
           err => console.log("ERROR EUY! : " + JSON.stringify(err)),
           () => console.log("done!");
           
        //    () => this.router.navigate(['./covid'])          
       })
   }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          uname: ['', Validators.required],
          pwd: ['', Validators.required]
      })
      this.uname = this.loginForm.controls['uname'].value
      this.pwd = this.loginForm.controls['pwd'].value
      
  }

}
