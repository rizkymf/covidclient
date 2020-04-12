import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginUser = new User()
  users : User[] = []
  user : User
  userCheck : User
  loginForm : FormGroup
  idToDelete : number
  check : boolean
  invalidLogin: boolean = false
  uname = ""
  pwd = ""

  constructor(private formBuilder: FormBuilder, private router: Router, private service : UserServiceService) { 
      service.getUser().subscribe(
          result => this.users = result,
          err => console.log("Ada error nich : " + JSON.stringify(err)),
          () => console.log("done!")
      )
   }
   onSubmit(){
       this.service.checkUser(this.loginUser)
       .subscribe((res) => {
           this.user = res,
           this.posisi()    
       });
   }

   

   posisi(){
       if(this.user.uname=="" && this.user.pwd==""){
           console.log("gagal");
       } else {
           if(this.user.posisi=="admin"){
               this.router.navigate(['./landing'])
           } else {
               this.router.navigate(['./covid'])
           }
       }
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
