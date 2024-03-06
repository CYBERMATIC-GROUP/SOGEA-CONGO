import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { FonctionAgent } from '../models/fonctionAgent.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';
@Injectable({
  providedIn: 'root'
})
export class FonctionAgentService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = "/sogeacongo/v1/Fonction_agent";

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(): Observable<FonctionAgent[]> {
    return this.http.get<FonctionAgent[]>(`${this.API_URL}${this.BASE_PATH}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDFonction_agent: string): Observable<FonctionAgent> {
    return this.http.get<FonctionAgent>(`${this.API_URL}${this.BASE_PATH}/${IDFonction_agent}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  update(fonctionagent: FonctionAgent): Observable<FonctionAgent> {
    return this.http.put<FonctionAgent>(`${this.API_URL}${this.BASE_PATH}/${fonctionagent.IDFonction_agent}`, fonctionagent,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  delete(IDFonction_agent: string): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}${this.BASE_PATH}/${IDFonction_agent}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  create(fonctionagent: FonctionAgent): Observable<FonctionAgent> {
    return this.http.post<FonctionAgent>(`${this.API_URL}${this.BASE_PATH}`, fonctionagent,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
