import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

        canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : any {
            const user  = JSON.parse(localStorage.getItem('usuario_blog'));
            const token = JSON.parse(localStorage.getItem('token'));
            if (user && token) {
                if(String(state.url).indexOf('/login') != -1){
                    this.router.navigate(['blog']);
                    return false;
                }
                else{
                    // logged in so return true 
                    return  new Promise(function (resolve, _reject) {
                        setTimeout(resolve, 1000, true)
                    })
                }
            }
            // not logged in so redirect to login page with the return url
            if(String(state.url).indexOf('/login') == -1){
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            else{
                return  new Promise(function (resolve, _reject) {
                    setTimeout(resolve, 500, true)
                })
            }
        }
}