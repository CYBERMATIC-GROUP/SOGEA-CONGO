import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { routesConstantes } from "src/environements/constante";
import { ConnexionComponent as ConnexionProprietaire } from "./connexion/connexion.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { AuthProprietaireGuard } from "../core/guards/auth.guard";
import { SelectVehiculeComponent } from "./select-vehicule/select-vehicule.component";
import { EpayComponent } from "../shared/epay/epay.component";
import { MesVehiculesComponent } from "./mes-vehicules/mes-vehicules.component";
import { DetailsSouscriptionComponent } from "./details-souscription/details-souscription.component";
import { Page404Component } from "../shared/page404/page404.component";

const routeConst = routesConstantes.espaceProprietaire;
const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthProprietaireGuard]},

    {path: routeConst.tableauDeBord, component: HomeComponent, canActivate: [AuthProprietaireGuard]},

    {path: routeConst.mesVehicule, component: MesVehiculesComponent, canActivate: [AuthProprietaireGuard]},

    {path: routeConst.baseRoute + '/' + routeConst.detailsSouscription, component: DetailsSouscriptionComponent, canActivate: [AuthProprietaireGuard]},

    {path: routeConst.connexion, component: ConnexionProprietaire},

    {path: routeConst.selectionSousription, component: SelectVehiculeComponent, canActivate: [AuthProprietaireGuard]},

    {path: 'paiement/:montant/:idsouscription/:immatriculation', component: EpayComponent, canActivate: [AuthProprietaireGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProprietaireRoutingModule{};