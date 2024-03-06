import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../voiture/services/connexion.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tree!:any[];
  currentPath!: string;

  leftMenuShow = true;


  ngOnInit(): void {
      this.tree = [
        {
          block:"main",
          icon:"home",
          navigation: [
            {
              route:"Tableau de bord",
              path:"/",
              isDropdown:false
            }
          ]
        },
        {
          navigation: [
            {
              route:"Saisie",
              path:"/",
              icon:"fa-solid fa-circle-down",
              isDropdown:true,
              subRoute:[
                {
                  route:"Gestion souscription",
                  path:"/tableau/amortissement",
                },
              ] 
            }, 
            {
              route:"Automobiles",
              path:"/",
              icon:"fa-solid fa-truck",
              isDropdown:true,
              subRoute:[
                {
                  route:"Liste des Automobiles",
                  path:"/voiture/automobile",
                },
                {
                  route:"Ajouter un Automobile",
                  path:"/voiture/automobile/nouveau",
                }
              ] 
            },

            // {
            //   route:"Par. Automobiles",
            //   path:"/",
            //   icon:"fa-solid fa-cog",
            //   isDropdown:true,
            //   subRoute:[
            //     {
            //       route:"Marque",
            //       path:"/voiture/marque",
            //     },
            //     {
            //       route:"Modele Automobile",
            //       path:"/voiture/modele-automobile",
            //     },
            //     {
            //       route:"Source Energie",
            //       path:"voiture/sourceEnergie/list",
            //     },
            //     {
            //       route:"Type Automobile",
            //       path:"voiture/typeAutomobile/list",
            //     },
            //     {
            //       route:"Propietaire",
            //       path:"voiture/proprietaire/list",
            //     },
            //     {
            //       route:"Genre",
            //       path:"/voiture/genre",
            //     },
            //     {
            //       route:"Departement",
            //       path:"/voiture/departement",
            //     },
            //     {
            //       route:"Categories",
            //       path:"voiture/category",
            //     }
            //   ] 
            // },
            {
              route:"Les societes",
              path:"/",
              icon:"fa fa-bank",
              isDropdown:true,
              subRoute:[
                {
                  route:"Liste des societes",
                  path:"/voiture/les-societes",
                },
                {
                  route:"Ajouter une societe",
                  path:"/voiture/les-societes/nouveau",
                },
              ] 
            },
            {
              route:"Statistiques",
              path:"/",
              icon:"fa fa-chart-bar",
              isDropdown:true,
              subRoute:[
                {
                  route:"Automobiles",
                  path:"/",
                },
                {
                  route:"Societes",
                  path:"/",
                },
                {
                  route:"Agents",
                  path:"/",
                },
               
              ] 
            },

            {
              route:"Partenaires",
              path:"/",
              icon:"fa-solid fa-charging-station",
              isDropdown:true,
              subRoute:[
                {
                  route:"Liste des Stations",
                  path:"/voiture/station/liste",
                },
              ] 
            },

            {
              route:"Position Points Vente",
              path:"/",
              icon:"fa-solid fa-location-dot",
              isDropdown:true,
              subRoute:[
                {
                  route:"Liste des points Vente",
                  path:"/voiture/stationPointVente/liste",
                },
              ] 
            },
            {
              route:"Gestion des utilisateurs",
              path:"/",
              icon:"fa-solid fa-user",
              isDropdown:true,
              subRoute:[
                {
                  route:"Liste des utilisateurs",
                  path:"voiture/agent/list",
                }
              ]
            },
          ]
        }
      ]
      this.currentPath = this._location.path();
      console.log(this.currentPath)
  }

  constructor(
    private connexionService:ConnexionService,
    public _location: Location,
    private router: Router
  ){}

  onLogout(){

    this.connexionService.logout();

  }

  onClickMenu(){
    const page = document.getElementById('page-middle')
    page?.classList.remove('central-page')
  }

}
