import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Agent } from '../models/agent.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/Agents';


  constructor(private http:HttpClient,  private globalService: GlobalService) { }

  getList(): Observable<Agent[]>{
    return this.globalService.setHttpRequest(this.BASE_PATH, "GET");
    /*return this.http.get<Agent[]>(this.API_URL + this.BASE_PATH, {headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);

        return EMPTY;
      }));*/
  }


  handleError(error: any) {
    throw new Error('Method not implemented.');
  }


  getOne(IDagent: number): Observable<Agent> {
    return this.globalService.setHttpRequest(this.BASE_PATH + "/" + IDagent.toString(), "GET");
    /*return this.http.get<Agent>(this.API_URL +  this.BASE_PATH + '/' + IDagent.toString(),{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);

        return EMPTY;
      }));*/
  }

  update(agent: Agent): Observable<Agent> {
    const uri = `${this.BASE_PATH}/${agent.IDagent.toString(),{headers: this.globalService.getHeaders()}}`;
    return this.globalService.setHttpRequest(uri, "PUT", agent);
    /*return this.http.put<Agent>(url, agent).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);

        return EMPTY;
      }));*/
  }

  delete(IDagent: number): Observable<string> {
    const uri = `${this.BASE_PATH}/${IDagent.toString(),{headers: this.globalService.getHeaders()}}`;
    return this.globalService.setHttpRequest(uri, "DELETE");
    /*return this.http.delete<string>(url).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);

        return EMPTY;
      }));*/
  }

  create(agent: Agent): Observable<Agent> {
    const uri = `${this.API_URL}${this.BASE_PATH}`;
    return this.globalService.setHttpRequest(uri, "DELETE");
    /*return this.http.post<Agent>(url, agent, {headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);

        return EMPTY;
      }));*/
  }
}
