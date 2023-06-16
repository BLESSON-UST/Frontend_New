import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateServiceService } from '../services/authenticate-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  
  constructor(private authServ:AuthenticateServiceService, private router:Router){}

 
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    if(this.authServ.ifAuth()){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
}
