import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { Station } from '../models/station.model';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/STATIONS';

  constructor(
    private http:HttpClient,
    private globalService: GlobalService
  ) { }


  getList(): Observable<Station[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.get<Station[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError(error => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }

  private handleError(error: any): void {
    // Gérez ici le traitement des erreurs, par exemple, afficher un message d'erreur à l'utilisateur
    console.log('An error occurred:', error);
    // Autres actions à effectuer en cas d'erreur, par exemple, enregistrer dans un journal
  }

  getOne(IDStation: number): Observable<Station> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDStation}`;
    return this.http.get<Station>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError(error => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }



  update(station: Station): Observable<Station> {
    const url = `${this.API_URL}${this.BASE_PATH}/${station.IDSTATIONS}`;
    return this.http.put<Station>(url, station,{headers: this.globalService.getHeaders()}).pipe(
      catchError(error => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }


  delete(IDStation: number): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDStation}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      catchError(error => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }

  
  create(station: Station): Observable<Station> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<Station>(url, station,{headers: this.globalService.getHeaders()}).pipe(
      catchError(error => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      })
    );
  }
}
