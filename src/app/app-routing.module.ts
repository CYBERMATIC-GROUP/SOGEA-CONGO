import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Connexion } from './voiture/models/connexion.model';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';
import { StatsComponent } from './stats/stats.component';
import { AmortissementComponent } from './amortissement/amortissement.component';
import { TableauAmortissementComponent } from './tableau-amortissement/tableau-amortissement.component';
import { SouscriptionListComponent } from './amortissement/souscription-list/souscription-list.component';
import { SouscriptionDetailsComponent } from './amortissement/souscription-details/souscription-details.component';
import { VinietteComponent } from './amortissement/viniette/viniette.component';
import { routesConstantes } from 'src/environements/constante';
import { AuthAdminGuard } from './core/guards/auth.guard';
import { StationServiceModule } from './station-service/station-service.module';

const routes: Routes = [
  {path: '', component: StatsComponent, canActivate: [AuthAdminGuard]},

  //lazzy loading
  {path: 'voiture', loadChildren: () => import('./voiture/voiture-routing.module').then(m => m.VoitureRoutingModule) },

  {path: routesConstantes.stationService.baseRoute, loadChildren: () => import('./station-service/station-service.module').then(m => m.StationServiceModule) },

  {path: routesConstantes.espaceProprietaire.baseRoute, loadChildren: () => import('./proprietaire/proprietaire-routing.module').then(m => m.ProprietaireRoutingModule)},

  {path: 'connexion', component: ConnexionFormComponent},

  {path: 'amortissement', component: AmortissementComponent},

  {path: 'liste-souscription', component: SouscriptionListComponent},

  {path: 'details-souscription/:IDSOUSCRIPTIONS', component: SouscriptionDetailsComponent},

  {path: 'tableau/amortissement', component: TableauAmortissementComponent},
  
  {path: 'impression/viniette', component: VinietteComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
