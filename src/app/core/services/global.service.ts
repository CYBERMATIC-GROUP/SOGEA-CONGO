import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { ErrorInterface } from '../models/error.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  toastConfig = {
    positionClass: 'toast-center-center',
    timeOut: 5000 * 10
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  raiseErrorServer(message: string = "", title: string = "Erreur serveur"){
    this.dialog.closeAll();
    const msg = message ?? "Impossible de joindre le serveur !";
    const ref = this.dialog.open(AlertComponent, {maxWidth: "500px"});
    ref.componentInstance.title = title;
    ref.componentInstance.content = msg;
    ref.componentInstance.buttonOKName = "OK";
    ref.componentInstance.buttonCancelName = "";
    
    return ref;
  }

  alert(msg: string, title: string, type: "info" | "success" | "danger", btnCamncel: string, btnOk: string){
    
    const ref = this.dialog.open(AlertComponent, {maxWidth: "500px"});
    ref.componentInstance.content = msg;
    ref.componentInstance.type = type;
    ref.componentInstance.buttonCancelName = btnCamncel;
    ref.componentInstance.buttonOKName = btnOk;
    ref.componentInstance.title = title;
    return ref;
  }

  firstLetterToUpper(myString: string): string{
    return myString.charAt(0).toUpperCase() + myString.slice(1);
  }

 formatPrix  (prixGiven : number, separateur: string = ' ', device: string = 'XAF') {
  
  const regex = /\./; // Utilisation du point comme indice de séparation
  const prix = prixGiven.toFixed(2);
  const [partie1, partie2] = prix.toString().split(regex);

   let  reverse : string[] = partie1.toString().split('').reverse();
   let prixFormated:string = '';
   
   for ( let i:number = 1 ; i <= reverse.length; i++ ) {
      prixFormated += reverse[i-1];
      if (i%3 === 0) {
        prixFormated += separateur;
      }
   }
   
   let formated = prixFormated.split('').reverse().join('')
   
   if ( formated[0] == separateur) {
   	formated = formated.substring(1)
   }
   const decimal = partie2 ? partie2 + ' ' : '00 ';
   return formated + ', ' + decimal + device;
   
  }

  getHeaders(): HttpHeaders {


    const login = localStorage.getItem('login') ?? "";

    const headers = new HttpHeaders({
      UTILISATEUER_LOGIN: login,
      UTILISATEUER_TOKEN: "xxx",
      ACTION: 1,
      RESSOURCE: ""
    });
  
    return headers;
  }
  
  setHttpRequest(uri: string, method: "POST" | "GET" | "DELETE" | "PUT", data: any = ""): Observable<any> {

    const baseUri = environment.apiUrl + uri;

    const headers = this.getHeaders();
    headers.set('RESSOURCE', uri);
    
    if (method === "GET")
    {
      return this.http.get(baseUri, {headers: headers}).pipe(
        tap(res => res),
        catchError((error, caught) => {
          const err: ErrorInterface = error.error;
          console.log(err.fault.detail);
          this.raiseErrorServer(err.fault.detail, err.fault.faultstring);
          return EMPTY;
        })
      );
    }

    else if (method === "POST")
    {
      return this.http.post(baseUri, data, {headers: headers}).pipe(
        tap(res => res),
        catchError((error, caught) => {
          const err: ErrorInterface = error.error;
          console.log(err);
          this.raiseErrorServer(err.fault.detail, err.fault.faultstring);
          return EMPTY;
        })
      );
    }

    else if (method === "DELETE")
    {
      return this.http.delete(baseUri, {headers: this.getHeaders()}).pipe(
        tap(res => res),
        catchError((error, caught) => {
          const err: ErrorInterface = error.error;
          console.log(err);
          this.raiseErrorServer(err.fault.detail, err.fault.faultstring);

          return EMPTY;
        })
      );
    }

    else if (method === "PUT")
    {
      return this.http.put(baseUri, data, {headers: this.getHeaders()}).pipe(
        tap(res => res),
        catchError((error, caught) => {
          const err: ErrorInterface = error.error;
          console.log(err);
          this.raiseErrorServer(err.fault.detail, err.fault.faultstring);
          return EMPTY;
        })
      );
    }
    
    return EMPTY
  }

  toastShow(msg: string, title: string){
    this.toast.success(msg, title, this.toastConfig);
  }

  reloadComponent(uri: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    });
  }

  printFile(base64: string){
      var anchor = document.createElement("a");
      anchor.href = base64
       anchor.download = "Liste Des Echéances ";
       document.body.appendChild(anchor);
      //  anchor.click();
      let pdfWindow = window.open("", "_blank", "Liste Echéances");
      pdfWindow ? pdfWindow!.document.write(
        "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
          encodeURI(base64) +
          "'></iframe></body>"
      ): null;
  }

  onDevelop(){
    this.alert("Fonctionnalité en cours de dévéloppement ! ", "Revenez bientôt !", "info", "", 'OK')
  }


  logout() {
    localStorage.clear();
    window.location.reload();
   }
}


