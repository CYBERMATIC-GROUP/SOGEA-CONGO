import { Injectable } from '@angular/core';

import { Roots } from '../models/amortissement.model';
import { environment } from 'src/environements/environment';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { GlobalService } from '../core/services/global.service';
import { ErrorInterface } from '../core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class AmortissementService {

  url = environment.apiUrl

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getByProduitAndDate(idProduit: string, DateEcheance: string, print: 1 | 0, idVehicule: string): Observable<Roots>{

    return this.globalService.setHttpRequest("/sogeacongo/v1/ClaculAmortissementCredit/" + idProduit + "/" + DateEcheance + "/" + print + "/" + idVehicule, "POST", {});
    /*const uri = this.url + "/sogeacongo/v1/ClaculAmortissementCredit/" + idProduit + "/" + DateEcheance + "/" + print + "/" + idVehicule;
    console.log(uri);
    
    return this.http.post<Roots>(uri, {}, {headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );*/
  }

  validContrat(nIDProduit: number, nDateDebut: string, bImprimeEtat: string, nIDVéhicule: number, RevenuMensuelNet: number, QCM: number){
    const uri = `/sogeacongo/v1/NouvelleSouscription/${nIDProduit}/${nDateDebut}/${bImprimeEtat}/${nIDVéhicule}`;


    console.log(uri)


    return this.globalService.setHttpRequest(uri, "POST", {RevenuMensuelNet: RevenuMensuelNet, QCM: QCM})
  }

  getSouscription(
    IDSOUSCRIPTIONS: number = 0,
    IDProduit: number = 0,
    Annee: number = 0,
    IDAutomobiles: number = 0,
    IDProprietaire: number = 0,
  ){

    const uri = "/sogeacongo/v1/SOUSCRIPTIONS_LISTE"

    return this.globalService.setHttpRequest(uri, "POST", {
      IDSOUSCRIPTIONS: IDSOUSCRIPTIONS,
      IDProduit: IDProduit,
      Annee: Annee,
      IDAutomobiles: IDAutomobiles,
      IDProprietaire: IDProprietaire
    });
  }

  setVersement(montant: number, idSouscription: number){
    const uri = "/sogeacongo/v1/Versement_Echeance/" + montant + "/" + idSouscription;
    return this.globalService.setHttpRequest(uri, "POST", {});
  }

  getEcheances(IDSOUSCRIPTIONS: number){
    const uri = "/sogeacongo/v1/SoldeCompte";
    return this.globalService.setHttpRequest(uri, "POST", {
      IDSOUSCRIPTIONS: IDSOUSCRIPTIONS
    });
  }

  printSouscription(IDSOUSCRIPTIONS: number){
    const uri = "/sogeacongo/v1/Imprime_Releve_Compte/" + IDSOUSCRIPTIONS;

    return this.globalService.setHttpRequest(uri, "POST", {});
  }

  printViniette(IDSOUSCRIPTIONS: number){
    const uri = "/sogeacongo/v1/Imprime_Viniette_Recto/" + IDSOUSCRIPTIONS;
    return this.globalService.setHttpRequest(uri, "GET");
  }
}
