import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Connexion } from '../voiture/models/connexion.model';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ConnexionService } from '../voiture/services/connexion.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Agent } from '../voiture/models/agent.model';
import { AuthStorage, routesConstantes } from 'src/environements/constante';



@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.scss']
})
export class ConnexionFormComponent implements OnInit{

  sLogin!: string;
  sPasseWord!: string;
  nIDPersonnel !:string
  isPasswordVisible = false;
  isLoading!: boolean;
  routes = routesConstantes


  constructor(
    private http:HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private connexionService:ConnexionService
  ) {}

  ngOnInit(): void {
      const obj = localStorage.getItem(AuthStorage.admin.agent)
      if(obj)
        this.router.navigate(['/'])
  }

  isFormValid(): boolean {
    if (this.sLogin && this.sPasseWord) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    
    console.log('cliquer');
    if (this.sLogin && this.sPasseWord) {
      this.isLoading = true;
      this.connexionService
        .login(this.sLogin, this.sPasseWord)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status == 0){
              const ref = this.dialog.open(AlertComponent);
              ref.componentInstance.content = 'Désolé certainement y\'a erreur liée serveur !';
              this.isLoading = false;
            }
            
            else{
              const ref = this.dialog.open(AlertComponent);
              ref.componentInstance.content = 'Mot de passe ou login invalide!';
              this.isLoading = false;
            }
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.isLoading = false;
            const agent: Connexion = data;
            console.log(data)

            console.log(agent && this.sLogin && this.sPasseWord);


            if (agent && this.sLogin && this.sPasseWord) {
              localStorage.setItem('agent', JSON.stringify(agent));
              window.location.href = "/"
     
            }
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
            const ref = this.dialog.open(AlertComponent);
            ref.componentInstance.content = 'erreur login ou mot de passe incorrect';
          }
        );
    }
  }
  message(message: any) {
    throw new Error('Method not implemented.');
  }

    togglePasswordVisibility(): void {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }


