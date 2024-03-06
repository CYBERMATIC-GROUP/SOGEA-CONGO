import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Produit } from '../models/produit.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/Produit';
  ProditAjout : string ="/sogeacongo/v1/AjouteProduit"

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<Produit[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.get<Produit[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDProduit: string): Observable<Produit> {
    const url = `${this.BASE_PATH}/${IDProduit}`;
    return this.globalService.setHttpRequest(url, "GET")
  }


  update(produit: Produit): Observable<Produit> {
    const url = `${this.BASE_PATH}/${produit.IDProduit}`;
    return this.globalService.setHttpRequest(url, "PUT", produit);
  }

  delete(IDProduit: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDProduit}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  create(produit: Produit): Observable<Produit> {
    const url = `${this.ProditAjout}`;
    return this.globalService.setHttpRequest(url, "POST", produit);
  } 
    
}



