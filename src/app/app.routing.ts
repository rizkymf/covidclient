import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CovidComponent } from './covid/covid.component';
import { EditCaseComponent } from './covid/edit-case.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'user',          component: UserComponent },
    { path: 'covid',      component: CovidComponent},
    { path: 'edit-case',      component: EditCaseComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }
