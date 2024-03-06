import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AgentService } from 'src/app/voiture/services/agent.service';
import { resLoginProprietaire } from '../models/res-login-proprietaire.model';
import { AuthStorage, routesConstantes } from 'src/environements/constante';
import { Router } from '@angular/router';

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
    private loginService: LoginService,
    private agentService: AgentService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.initForm();

      if(localStorage.getItem(AuthStorage.proprietaire.proprietaire)){
        this.router.navigate([routesConstantes.espaceProprietaire.baseRoute])
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
    console.log(identifiant, password);
    this.loginService.loginProprietaire(identifiant, password).subscribe(data => {
      let proprio = data;
      console.log(proprio)
      localStorage.setItem(AuthStorage.proprietaire.proprietaire, JSON.stringify(proprio))
      this.isLoading = false;

      const routeProprio = routesConstantes.espaceProprietaire;
      this.router.navigate([ routeProprio.baseRoute]).then(res =>{
        location.reload();
      });
  
    })
  }
}
