import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from './connexion/connexion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EcheancierComponent } from './echeancier/echeancier.component';
import { SelectVehiculeComponent } from './select-vehicule/select-vehicule.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsSouscriptionComponent } from './details-souscription/details-souscription.component';
import { MesVehiculesComponent } from './mes-vehicules/mes-vehicules.component';


@NgModule({
  declarations: [
    ConnexionComponent,
    DashboardComponent,
    HomeComponent,
    EcheancierComponent,
    SelectVehiculeComponent,
    DetailsSouscriptionComponent,
    MesVehiculesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProprietaireRoutingModule,
    SharedModule
  ]
})
export class ProprietaireModule { }
