import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Genre } from '../models/genre.models';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = "/sogeacongo/v1/Genre";

  constructor(
    private http: HttpClient,
    private globalService : GlobalService
  ) { }

  getList(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.API_URL}${this.BASE_PATH}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDGenre: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.API_URL}${this.BASE_PATH}/${IDGenre}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  update(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.API_URL}${this.BASE_PATH}/${genre.IDGenre}`, genre,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDGenre: string): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}${this.BASE_PATH}/${IDGenre}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.API_URL}${this.BASE_PATH}`, genre,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
