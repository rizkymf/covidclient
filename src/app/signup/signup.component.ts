import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    userForm: FormGroup
    nama = ""
    uname = ""
    pwd = ""
    posisi = "user"
    isLoadingResults = false

    constructor(private router: Router, private service : UserServiceService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.userForm= this.formBuilder.group({
            nama:[null, Validators.required],
            posisi:["user", Validators.required],
            uname:[null, Validators.required],
            pwd: [null, Validators.required]
        })
    }

    onSubmit(){
        this.isLoadingResults = true
        this.service.addUser(this.userForm.value).subscribe((res:any) => {
            this.isLoadingResults = false;
            this.router.navigate(['./covid'])
        })
        this.router.navigate(['./covid'])
    }
}
