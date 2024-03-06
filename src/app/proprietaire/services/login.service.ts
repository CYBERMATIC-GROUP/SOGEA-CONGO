import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Proprietaire } from 'src/app/voiture/models/proprietaire.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = "/sogeacongo/v1/PROPRIETAIRE/";

  constructor(
    private globalService: GlobalService
  ) { }

  loginProprietaire(identifiant: string, password: string): Observable<Proprietaire | undefined>{
    const uri = this.uri + identifiant + '/' + password;
    return this.globalService.setHttpRequest(uri, "GET");
  }

}
