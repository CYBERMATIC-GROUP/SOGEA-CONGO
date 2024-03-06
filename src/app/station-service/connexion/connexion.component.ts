import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from 'src/app/voiture/services/agent.service';
import { AuthStorage, routesConstantes } from 'src/environements/constante';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, finalize, tap } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  isLoading!: boolean;
  isPasswordVisible!: boolean;
  loginForm!: FormGroup

  typePswd: "password" | "text" = "password";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
      this.initForm();
      if(localStorage.getItem(AuthStorage.station.station)){
        this.router.navigate([routesConstantes.stationService.baseRoute])
      }
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      identifiant: [null , [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    if(this.typePswd == "password")
      this.typePswd = 'text';
    else
      this.typePswd = 'password';
  }

  submitLogin(){
    this.isLoading = true
    const {identifiant, password} = this.loginForm.value;

    this.loginService.login(identifiant.toUpperCase(), password).pipe(
      tap(res => {
        localStorage.setItem(AuthStorage.station.station, JSON.stringify(res))
        this.router.navigate(['/' + routesConstantes.stationService.baseRoute]);
        this.globalService.toastShow('Connexion réussie avec success !', "Connexion")
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()

  }
}
