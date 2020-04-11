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
    isLoadingResults = false

    constructor(private router: Router, private service : UserServiceService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.userForm= this.formBuilder.group({
            nama:[null, Validators.required],
            uname:[null, Validators.required],
            pwd: [null, Validators.required]
        })
    }

    onSubmit(){
        this.isLoadingResults = true
        this.service.addUser(this.userForm.value).subscribe((res:any) => {
            const uname = res.uname;
            this.isLoadingResults = false;
            this.router.navigate(['/'])
        })
    }

    // addUsers(){
    //     this.service.addUser(this.userFormGroup.value).subscribe(data => {
    //         this.user = data;
    // })
}
