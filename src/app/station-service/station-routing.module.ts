import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StationDashboardComponent } from './station-dashboard/station-dashboard.component';
import { StationGuard } from '../core/guards/station.guard';
import { routesConstantes } from 'src/environements/constante';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from '../shared/page404/page404.component';
import { HomeComponent } from './home/home.component';
import { SousStationsComponent } from './sous-stations/sous-stations.component';

const routesStation = routesConstantes.stationService

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [StationGuard]},
  {path: routesStation.tableauDeBord, component: StationDashboardComponent, canActivate: [StationGuard]},
  {path: routesStation.connexion, component: ConnexionComponent},
  {path: routesStation.pointsVente, component: SousStationsComponent, canActivate: [StationGuard]},
  {path: '**', component: Page404Component}
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StationRoutingModule { }
