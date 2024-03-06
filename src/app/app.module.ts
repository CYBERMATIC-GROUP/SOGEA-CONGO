import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { VoitureModule } from './voiture/voiture.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './core/alert/alert.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoryComponent } from './voiture/category/category.component';
import { VoitureModule } from './voiture/voiture.module';
import {MatButtonModule} from '@angular/material/button'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
//import { VoitureModule } from './voiture/voiture.module';
import { ModeleAutomobileFormComponent } from './voiture/modele-automobile/modele-automobile-form/modele-automobile-form.component';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';
import { CookieService } from 'ngx-cookie-service';

import { registerLocaleData } from '@angular/common';
import  localeFr from '@angular/common/locales/fr';

import { StatsComponent } from './stats/stats.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AmortissementComponent } from './amortissement/amortissement.component';
import { TableauAmortissementComponent } from './tableau-amortissement/tableau-amortissement.component';
import { Interceptor } from './core/services/Interceptors.service';
import { SouscriptionListComponent } from './amortissement/souscription-list/souscription-list.component';
import { SouscriptionDetailsComponent } from './amortissement/souscription-details/souscription-details.component';
import { SouscriptionFormComponent } from './amortissement/souscription-form/souscription-form.component';
import { VinietteComponent } from './amortissement/viniette/viniette.component';
import { ProprietaireModule } from './proprietaire/proprietaire.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlertComponent,
    ModeleAutomobileFormComponent,
    ConnexionFormComponent,
    StatsComponent,
    AmortissementComponent,
    TableauAmortissementComponent,
    SouscriptionDetailsComponent,
    SouscriptionFormComponent,
    VinietteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //VoitureModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgApexchartsModule,
    //ProprietaireModule doit au moins etre importe sans declaration d'import
    SharedModule
  ],
  providers: [
    CookieService, 
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    //{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){
    registerLocaleData(localeFr, 'fr');
  }

}
