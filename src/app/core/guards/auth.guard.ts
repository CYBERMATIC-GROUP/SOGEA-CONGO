import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AgentService } from 'src/app/voiture/services/agent.service';
import { ProprietaireService } from 'src/app/voiture/services/proprietaire.service';
import { AuthStorage, routesConstantes } from 'src/environements/constante';

@Injectable({
  providedIn: 'root'
})
export class AuthProprietaireGuard implements CanActivate {
  constructor(
    private proprietaireService: ProprietaireService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token  = localStorage.getItem(AuthStorage.proprietaire.proprietaire);
    console.log(token)
    if (token){
      return true;
    }else{
      const proprioRouteConst = routesConstantes.espaceProprietaire;
      this.router.navigate([ proprioRouteConst.baseRoute + '/' + proprioRouteConst.connexion]);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private proprietaireService: AgentService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token  = localStorage.getItem(AuthStorage.admin.agent);
    console.log(token)
    if (token){
      return true;
    }else{
      const proprioRouteConst = routesConstantes.espaceProprietaire;
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}