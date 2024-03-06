import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouscriptionListComponent } from '../amortissement/souscription-list/souscription-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EpayComponent } from './epay/epay.component';
import { LoaderComponent } from '../core/loader/loader.component';
import { AutomobileComponent } from '../voiture/automobile/automobile.component';
import { WaitingValidationComponent } from './epay/waiting-validation/waiting-validation.component';
import { Page404Component } from './page404/page404.component';
import { StationPointsVenteComponent } from './station-points-vente/station-points-vente.component';


@NgModule({
  declarations: [
    SouscriptionListComponent,
    EpayComponent,
    LoaderComponent,
    AutomobileComponent,
    WaitingValidationComponent,
    Page404Component,
    StationPointsVenteComponent
  ],
  exports: [
    SouscriptionListComponent,
    LoaderComponent,
    AutomobileComponent,
    StationPointsVenteComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class SharedModule { }
