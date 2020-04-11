export class Login {
    notLoggedIn : boolean = true;

    isLogin(){
        this.notLoggedIn = false;
    }

    isLogout(){
        this.notLoggedIn = true;
    }
}
