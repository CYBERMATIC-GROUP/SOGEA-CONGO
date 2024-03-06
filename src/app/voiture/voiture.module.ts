import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
//import { HttpClientModule } from '@angular/common/http';
import { VoitureRoutingModule } from './voiture-routing.module';
import { CategoryFomComponent } from './category/category-fom/category-fom.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GenreComponent } from './genre/genre.component';
import { SocieteComponent } from './societe/societe.component';
import { ModeleAutomobileComponent } from './modele-automobile/modele-automobile.component';
import { SocieteFormComponent } from './societe/societe-form/societe-form.component';
import { MarqueAutoFormComponent } from './marque-automobile/marque-auto-form/marque-auto-form.component';
import { GenreFormComponent } from './genre/genre-form/genre-form.component';
import { MarqueAutomobileComponent } from './marque-automobile/marque-automobile.component';
import {MatButtonModule} from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AutomobileComponent } from './automobile/automobile.component';
import { AutomobileFormComponent } from './automobile/automobile-form/automobile-form.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { ProprietaireFormComponent } from './proprietaire/proprietaire-form/proprietaire-form.component';
import { SourceEnergieComponent } from './source-energie/source-energie.component';
import { SourceEnergieFormComponent } from './source-energie/source-energie-form/source-energie-form.component';
import { TypeAutomobileComponent } from './type-automobile/type-automobile.component';
import { TypeAutomobileFormComponent } from './type-automobile/type-automobile-form/type-automobile-form.component';
import { AgentComponent } from './agent/agent.component';
import { AgentFormComponent } from './agent/agent-form/agent-form.component';
import { DepartementComponent } from './departement/departement.component';
import { DeparementFormComponent } from './departement/deparement-form/deparement-form.component';
import { LesSocietesComponent } from './les-societes/les-societes.component';
import { LesSocieteFormComponent } from './les-societes/societe-form/societe-form.component';
import { FonctionAgentComponent } from './fonction-agent/fonction-agent.component';
import { FonctionAgentFormComponent } from './fonction-agent/fonctionAgent/fonction-agent-form/fonction-agent-form.component';
import { CompteComponent } from './compte/compte.component';
import { CompteFormComponent } from './compte/compte-form/compte-form.component';
import { ArrondissementComponent } from './arrondissement/arrondissement.component';
import { QuartierComponent } from './quartier/quartier.component';
import { ArrondissementFormComponent } from './arrondissement/arrondissement-form/arrondissement-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../core/loader/loader.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FilterComponent } from './automobile/automobile-form/filter/filter.component'; 
import { ParmAutomobileComponent } from './parm.automobile/parm.automobile.component';
import { QuartierFormComponent } from './quartier/quartier-form/quartier-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ProduitComponent } from './produit/produit.component';
import { ProduitFormComponent } from './produit/produit-form/produit-form.component';
import { CalculEcheanceComponent } from './calcul-echeance/calcul-echeance.component';
import { StationsComponent } from './stations/stations.component';
import { StationsFormComponent } from './stations/stations-form/stations-form.component';
import { StationPointVenteComponent } from './station-point-vente/station-point-vente.component';
import { StationPointVenteFormComponent } from './station-point-vente/station-point-vente-form/station-point-vente-form.component';
import { LiasseComponent } from './liasse/liasse.component';
import { LiasseFormComponent } from './liasse/liasse-form/liasse-form.component';
import { CompteVersListeComponent } from './compte-vers-liste/compte-vers-liste.component';
import { NationaliteComponent } from './nationalite/nationalite.component';
import { NationaliteFormComponent } from './nationalite/nationalite-form/nationalite-form.component';
import { VilleComponent } from './ville/ville.component';
import { VilleFormComponent } from './ville/ville-form/ville-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryFomComponent,
    MarqueAutoFormComponent,
    GenreComponent,
    GenreFormComponent,
    SocieteComponent,
    ModeleAutomobileComponent,
    SocieteFormComponent,
    MarqueAutomobileComponent,
    AutomobileFormComponent,
    ProprietaireComponent,
    ProprietaireFormComponent,
    SourceEnergieComponent,
    SourceEnergieFormComponent,
    TypeAutomobileComponent,
    TypeAutomobileFormComponent,
    AgentComponent,
    AgentFormComponent,
    DepartementComponent,
    DeparementFormComponent,
    LesSocietesComponent,
    LesSocieteFormComponent,
    FonctionAgentComponent,
    FonctionAgentFormComponent,
    CompteComponent,
    CompteFormComponent,
    ArrondissementComponent,
    QuartierComponent,
    ArrondissementFormComponent,
     FilterComponent,
     FilterComponent,
     ParmAutomobileComponent,
     QuartierFormComponent,
     ProduitComponent,
     ProduitFormComponent,
     CalculEcheanceComponent,
     StationsComponent,
     StationsFormComponent,
     StationPointVenteComponent,
     StationPointVenteFormComponent,
     LiasseComponent,
     LiasseFormComponent,
     CompteVersListeComponent,
     NationaliteComponent,
     NationaliteFormComponent,
     VilleComponent,
     VilleFormComponent,

  ],
  imports: [
    CommonModule,
    VoitureRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTabsModule,
    SharedModule
  ]
})
export class VoitureModule { }
