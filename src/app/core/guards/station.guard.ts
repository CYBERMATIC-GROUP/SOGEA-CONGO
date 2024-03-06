import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AgentService } from 'src/app/voiture/services/agent.service';
import { ProprietaireService } from 'src/app/voiture/services/proprietaire.service';
import { StationsService } from 'src/app/voiture/services/sations.service';
import { AuthStorage, routesConstantes } from 'src/environements/constante';

@Injectable({
  providedIn: 'root'
})
export class StationGuard implements CanActivate {
  constructor(
    private stationService: StationsService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token  = localStorage.getItem(AuthStorage.station.station);
    if (token){
      return true;
    }else{
      const stationRoute = routesConstantes.stationService;
      this.router.navigate([ stationRoute.baseRoute + '/' + stationRoute.connexion]);
      return false;
    }
  }
}