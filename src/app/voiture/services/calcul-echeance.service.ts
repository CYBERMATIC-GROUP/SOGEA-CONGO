import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { CalculEcheance, BaseUlr } from '../models/calculEcheance.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root',
})
export class CalculEcheanceService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/v1/sogeacongo/v1/CalculEcheance';
  imprimesEcheance: string = '/sogeacongo/v1/Imprime_echeances';

  constructor(private http: HttpClient,private globalService:GlobalService) {}


  getListe(moMontant: string, nNbreEcheance: string, nDateDebut: string): Observable<CalculEcheance[]> {
    const uriLiasse = `/sogeacongo/v1/CalculEcheance/${moMontant}/${nNbreEcheance}/${nDateDebut}`;
    const url = `${this.API_URL}${uriLiasse}`;
    return this.http.get<CalculEcheance[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {

        return EMPTY;
      }));
  }
  

  getList(moMontant: string, nNbreEcheance: number, nDateDebut: string): Observable<CalculEcheance[]> {
    const uriLiasse = `/sogeacongo/v1/CalculEcheance/${moMontant}/${nNbreEcheance}/${nDateDebut}`;
    const url = `${this.API_URL}${uriLiasse}`;
    return this.http.get<CalculEcheance[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  

  impression(IDProduit: string, nDateDebut: string): Observable<CalculEcheance> {
    const uriLiasse = `/sogeacongo/v1/CalculEcheance/${IDProduit}/${nDateDebut}`;
    const url = `${this.API_URL}${uriLiasse}`;
    return this.http.get<CalculEcheance>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


}
