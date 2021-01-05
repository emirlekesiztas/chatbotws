import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication-service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService:AuthenticationService) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentTokenValue === null) {
      this.authService.logout();
      return false;
    }else{
      if(state.url === '/login'){
        this.router.navigate(['/orders']);
      }
      return true;
    }
  }

}
