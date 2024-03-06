import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Connexion } from '../models/connexion.model';
import { Observable, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OpenModalTokenComponent } from '../open-modal-token/open-modal-token.component';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  API_URL: string = environment.apiUrl
  uriConnexion: string = "sogeacongo/v1/DemandeConnexion";


  constructor(
    private http: HttpClient,
    private router : Router,
    private dialog:MatDialog
  ) { }


  
  login(sLogin: string, sPasseWord: string): Observable<Connexion> {
    const url = `${this.API_URL}/${this.uriConnexion}/${sLogin}/${sPasseWord}`;
    const payload = {
      login: sLogin,
      motDePasse: sPasseWord
    };
  
    const headers = new HttpHeaders({
      UTILISATEUER_LOGIN: sLogin,
      UTILISATEUER_TOKEN: "xxx",
      ACTION: "1"

    });
  
    return this.http.post<Connexion>(url, payload, { headers: headers }).pipe(
      tap(connexion => {
        if (connexion.etat === 1) {
          // Connexion réussie
          localStorage.setItem('login', sLogin);
          localStorage.setItem('motDePasse', sPasseWord);
          console.log(sLogin);
        } else if (connexion.etat === 2) {

          const dialog = this.dialog.open(OpenModalTokenComponent, {
          maxWidth :"500px"

          });
        
        } else {
          // État différent de 1 ou 2, la connexion échoue
          // Vous pouvez ajouter un traitement ici, par exemple afficher un message d'erreur
        }
      })
    );
  }
  
  


     logout() {
      localStorage.clear();
      window.location.reload();
     }

}
