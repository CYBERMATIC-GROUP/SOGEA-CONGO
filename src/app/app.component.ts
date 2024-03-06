import { Component, OnInit } from '@angular/core';
import { Connexion } from './voiture/models/connexion.model';
import { ConnexionService } from './voiture/services/connexion.service';
import { Agent } from './voiture/models/agent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',   
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sogeacongo';
  nomPersonnel = "simeon";
  isLogin: boolean = false;
  agent!: Agent

  constructor(private connexionService:ConnexionService, private router:Router){

    const personnelObject = localStorage.getItem("agent");
    console.log(personnelObject);
    if(personnelObject){
      this.agent = JSON.parse(personnelObject);
      console.log(this.agent)
      this.nomPersonnel = this.agent.Nom;
      this.isLogin = true;
    }

  }

  ngOnInit(): void {
      
    /*setInterval( () =>{

      if(!localStorage.getItem("agent")){
        this.isLogin = false;
        this.router.navigate(['/connexion']);
      } 

    },1000)*/
   }

  onLogout(){
    this.connexionService.logout();
  }
}
