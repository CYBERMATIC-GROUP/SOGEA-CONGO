import { Injectable, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { Quartier } from '../models/quartier.model';
import { Arrondissement } from '../models/arrondissement.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';
@Injectable({
  providedIn: 'root'
})
export class QuartierService {


  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/Quartier';
  uriRessource:string = "/sogeacongo/v1/GetRessource/Quartier"
  uriRessources:string = "/sogeacongo/v1/GetRessource/Arrondissement"

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(IDDEPARTEMENT: string): Observable<Quartier[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
  
    return this.http.get<Quartier[]>(url, { params: data }).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  getOne(IDQUARTIER: string): Observable<Quartier> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDQUARTIER}`;
    return this.http.get<Quartier>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(quartier: Quartier): Observable<Quartier> {
    const url = `${this.API_URL}${this.BASE_PATH}/${quartier.IDQUARTIER}`;
    return this.http.put<Quartier>(url, quartier,{headers: this.globalService.getHeaders()});
  }

  delete(IDQUARTIER: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDQUARTIER}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(quartier: Quartier): Observable<Quartier> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<Quartier>(url, quartier,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  Recuperations(IDDEPARTEMENT: string): Observable<Arrondissement[]> {
    const url = `${this.API_URL}${this.uriRessources}`;
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
  
    return this.http.post<Arrondissement[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  

  RecuperationArrondissement(IDARRONDISSEMENT: string): Observable<Quartier[]> {
    const url = `${this.API_URL}${this.uriRessource}`;
    const data = { IDARRONDISSEMENT: IDARRONDISSEMENT };
  
    return this.http.post<Quartier[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  
  RecuperationDepartement(IDDEPARTEMENT: string): Observable<Quartier[]> {
    const url = `${this.API_URL}${this.uriRessource}`;
    const data = { IDDEPARTEMENT: IDDEPARTEMENT };
  
    return this.http.post<Quartier[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  

}
