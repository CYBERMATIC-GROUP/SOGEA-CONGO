import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationDashboardComponent } from './station-dashboard/station-dashboard.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { StationRoutingModule } from './station-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SousStationsComponent } from './sous-stations/sous-stations.component';



@NgModule({
  declarations: [
    StationDashboardComponent,
    ConnexionComponent,
    HomeComponent,
    SousStationsComponent
  ],
  imports: [
    CommonModule,
    StationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StationServiceModule { }
