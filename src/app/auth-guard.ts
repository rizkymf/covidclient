import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./service/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router : Router, private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authenticationService.currentUserValue
        if(currentUser){
            return true
        }
    }
    
}
