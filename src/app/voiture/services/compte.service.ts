import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Compte } from '../models/compte.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/GetCompte';
  uriSupprime:string = "/sogeacongo/v1/CompteSupprime";
  compteAjout: string = "/sogeacongo/v1/CompteAjoute"

  constructor(private http:HttpClient, private globalService:GlobalService) { }


  getList(IDCOMPTE: string): Observable<Compte[]> {
    const data = { IDCOMPTE: IDCOMPTE };
    const url = `${this.API_URL}${this.BASE_PATH}`;
  
    return this.http.post<Compte[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  getOne(IDCOMPTE: string): Observable<Compte[]> {
    const data = { IDCOMPTE: IDCOMPTE };
    const url = `${this.API_URL}${this.BASE_PATH}`;
  
    return this.http.post<Compte[]>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  update(compte: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.API_URL}${this.compteAjout}/${compte.IDCOMPTE}`, compte,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDCOMPTE: string): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}${this.uriSupprime}/${IDCOMPTE}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  create(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(`${this.API_URL}${this.compteAjout}`, compte,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}

