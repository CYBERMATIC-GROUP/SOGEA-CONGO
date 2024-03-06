import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { Station } from '../models/station.model';
import { AuthStorage } from 'src/environements/constante';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private globalService: GlobalService
  ) { }

  login(codeStation: string, password: string){
    const uri = `/sogeacongo/v1/STATIONS_DemandeConnexion/${codeStation}/${password}`
    return this.globalService.setHttpRequest(uri, "POST", {})
  }

  getStationStorage(): Station | undefined {
    const objStore = localStorage.getItem(AuthStorage.station.station);

    if(objStore){
      const station: Station = JSON.parse(objStore);
      return station;
    }

    return undefined
  }
}
