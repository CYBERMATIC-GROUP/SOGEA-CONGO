import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { StationPointVente } from '../models/stationPointVente.model';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Arrondissement } from '../models/arrondissement.model';
import { Quartier } from '../models/quartier.model';
import { Station } from '../models/station.model';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class StationPointVenteService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/StationPointVente';
  uriRessource: string="/sogeacongo/v1/StationPointVenteGetListe"
  uriRessources:string = "/sogeacongo/v1/GetRessource/Arrondissement"
  uriRessourceQuartier:string = "/sogeacongo/v1/GetRessource/Quartier"

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }

  getList(): Observable<StationPointVente[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.get<StationPointVente[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
  

  getOne(IDVENDEURS: number): Observable<StationPointVente> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDVENDEURS}`;
    return this.http.get<StationPointVente>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
  

  update(stationPointVente: StationPointVente): Observable<StationPointVente>{
    const url = `${this.API_URL}${this.BASE_PATH}/${stationPointVente.IDVENDEURS}`;
    return this.http.put<StationPointVente>(url, stationPointVente,{headers: this.globalService.getHeaders()}).pipe(
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
  

  delete(IDVENDEURS: number): Observable<string>{
    const url = `${this.API_URL}${this.BASE_PATH}/${IDVENDEURS}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
  

  create(stationPointVente: StationPointVente): Observable<StationPointVente>{
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<StationPointVente>(url, stationPointVente,{headers: this.globalService.getHeaders()}).pipe(
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
  

  RecuperationArrondissements(IDARRONDISSEMENT: string): Observable<StationPointVente[]>{
    const data = { IDARRONDISSEMENT: IDARRONDISSEMENT };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  


  RecuperationDepartement(IDDEPARTEMENT: string): Observable<StationPointVente[]>{
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  Recuperation_Arr_Departement(IDDEPARTEMENT: string): Observable<Arrondissement[]> {
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<Arrondissement[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  RecuperationQuartier(IDQUARTIER: string): Observable<StationPointVente[]> {
    const data = { IDQUARTIER: IDQUARTIER };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()});
  }
  


  RecuperationStation(IDSTATIONS: string): Observable<StationPointVente[]> {
    const data = { IDSTATIONS: IDSTATIONS };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  RecuperationCycle(IDDEPARTEMENT: string, IDARRONDISSEMENT: string, IDQUARTIER: string, IDSTATIONS: string): Observable<StationPointVente[]> {
    const data = {
      IDDEPARTEMENT: IDDEPARTEMENT,
      IDARRONDISSEMENT: IDARRONDISSEMENT,
      IDQUARTIER: IDQUARTIER,
      IDSTATIONS: IDSTATIONS
    };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()});
  }
  

  Recuperations(IDDEPARTEMENT: string): Observable<Arrondissement[]> {
    const data = {
      IDDEPARTEMENT: IDDEPARTEMENT
    };
    const url = `${environment.apiUrl}${this.uriRessources}`;
    return this.http.post<Arrondissement[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  RecuperationVendeurs(IDVENDEURS: string): Observable<StationPointVente[]> {
    const data = {
      IDVENDEURS: IDVENDEURS
    };
    const url = `${environment.apiUrl}${this.uriRessource}`;
    return this.http.post<StationPointVente[]>(url, data,{headers: this.globalService.getHeaders()});
  }
  


  Recuperation_Quartier_Arr(IDARRONDISSEMENT: string): Observable<Quartier[]> {
    const data = { IDARRONDISSEMENT: IDARRONDISSEMENT };
    return this.http.post<Quartier[]>(environment.apiUrl + this.uriRessourceQuartier, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }



}
