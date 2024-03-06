import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { CompteVersListe } from '../models/compteVersListe.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';


@Injectable({
  providedIn: 'root'
})
export class CompteVersListeService {


  API_URL: string = environment.apiUrl
  uriLiasse: string = "/sogeacongo/v1/CompteVersListe";

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<CompteVersListe[]> {
    const url = `${this.API_URL}${this.uriLiasse}`;
    return this.http.get<CompteVersListe[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  get(IDCOMPTE: string = "0"): Observable<CompteVersListe> {
    const uri: string = IDCOMPTE !== "0" ? `${this.uriLiasse}/${IDCOMPTE}` : this.uriLiasse;
    return this.http.post<CompteVersListe>(this.API_URL, { route: uri, method: "GET" },{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  

  //La création

  create(compte: CompteVersListe): Observable<CompteVersListe> {
    const data = { data: compte, route: this.uriLiasse, method: "POST" };
    return this.http.post<CompteVersListe>(this.API_URL, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  //Mise à jour
  update(compte: CompteVersListe): Observable<CompteVersListe> {
    const data = {
      data: compte,
      method: "PUT",
      route: this.uriLiasse + "/" + compte.IDCOMPTE
    };
    return this.http.put<CompteVersListe>(this.API_URL, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  //La suppression

  delete(IDCOMPTE: string): Observable<CompteVersListe> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriLiasse}/${IDCOMPTE}`,
    };
    return this.http.request<CompteVersListe>('DELETE', this.API_URL, { body: payload }).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
