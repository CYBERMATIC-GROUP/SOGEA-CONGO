import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category/category.component";
import { SocieteComponent } from "./societe/societe.component";
import { SocieteFormComponent } from "./societe/societe-form/societe-form.component";
import { AutomobileComponent } from "./automobile/automobile.component";
import { AutomobileFormComponent } from "./automobile/automobile-form/automobile-form.component";
import { GenreFormComponent } from "./genre/genre-form/genre-form.component";
import { GenreComponent } from "./genre/genre.component"; 
import { MarqueAutoFormComponent } from "./marque-automobile/marque-auto-form/marque-auto-form.component"; 
import { MarqueAutomobileComponent } from "./marque-automobile/marque-automobile.component"; 
import { ModeleAutomobileFormComponent } from "./modele-automobile/modele-automobile-form/modele-automobile-form.component"; 
import { ModeleAutomobileComponent } from "./modele-automobile/modele-automobile.component"; 
import { ProprietaireComponent } from "./proprietaire/proprietaire.component";
import { ProprietaireFormComponent } from "./proprietaire/proprietaire-form/proprietaire-form.component"; 
import { SourceEnergieFormComponent } from "./source-energie/source-energie-form/source-energie-form.component"; 
import { SourceEnergieComponent } from "./source-energie/source-energie.component";
import { TypeAutomobileFormComponent } from "./type-automobile/type-automobile-form/type-automobile-form.component"; 
import { TypeAutomobileComponent } from "./type-automobile/type-automobile.component"; 
import { AgentComponent } from "./agent/agent.component";
import { AgentFormComponent } from "./agent/agent-form/agent-form.component";
import { DepartementComponent } from "./departement/departement.component";
import { LesSocietesComponent } from "./les-societes/les-societes.component";
import { LesSocieteFormComponent } from "./les-societes/societe-form/societe-form.component";
import { FonctionAgentComponent } from "./fonction-agent/fonction-agent.component";
import { CompteComponent } from "./compte/compte.component";
import { CompteFormComponent } from "./compte/compte-form/compte-form.component";
import { Arrondissement } from "./models/arrondissement.model";
import { ArrondissementComponent } from "./arrondissement/arrondissement.component";
import { ArrondissementFormComponent } from "./arrondissement/arrondissement-form/arrondissement-form.component";
import { ParmAutomobileComponent } from "./parm.automobile/parm.automobile.component";
import { QuartierComponent } from "./quartier/quartier.component";
import { ProduitComponent } from "./produit/produit.component";
import { CalculEcheanceComponent } from "./calcul-echeance/calcul-echeance.component";
import { StationsComponent } from "./stations/stations.component";
import { StationPointVenteComponent } from "./station-point-vente/station-point-vente.component";
import { StationPointVenteFormComponent } from "./station-point-vente/station-point-vente-form/station-point-vente-form.component";
import { ProduitFormComponent } from "./produit/produit-form/produit-form.component";
import { CategoryFomComponent } from "./category/category-fom/category-fom.component";
import { Liasse } from "./models/liasse.model";
import { LiasseFormComponent } from "./liasse/liasse-form/liasse-form.component";
import { LiasseComponent } from "./liasse/liasse.component";
import { CompteVersListeComponent } from "./compte-vers-liste/compte-vers-liste.component";
import { CompteVersListeFormComponent } from "./compte-vers-liste/compte-vers-liste-form/compte-vers-liste-form.component";
import { NationaliteComponent } from "./nationalite/nationalite.component";
import { NationaliteFormComponent } from "./nationalite/nationalite-form/nationalite-form.component";
import { VilleComponent } from "./ville/ville.component";
import { VilleFormComponent } from "./ville/ville-form/ville-form.component";


const routes: Routes = [
    
    {path: "category", component: CategoryComponent},
    {path: "category/:action/:CategoriesID", component: CategoryFomComponent},


    {path: "societe", component: SocieteComponent},
    {path: "societe/:action/:societeID", component: SocieteFormComponent},
 

    {path: "automobile", component: AutomobileComponent},
    {path: "genre", component: GenreComponent},
    {path: "marque", component: MarqueAutomobileComponent},
    {path: "societe/:update/:idSociete", component: SocieteFormComponent},
    {path: "societe/:vue/:idSociete", component: SocieteFormComponent},
    {path: "automobile/nouveau", component: AutomobileFormComponent},
    {path: "automobile/:action/:idAuto", component: AutomobileFormComponent},


    {path: "societe", component: SocieteComponent},
    {path: "societe/:action/:societeID", component: SocieteFormComponent},
    
    {path:'genre/ajout', component: GenreFormComponent},
    {path:'genre/:action/GENREID', component: GenreFormComponent},
    {path:'genre/list', component: GenreComponent},

    {path:'compteversListe/ajout', component: CompteVersListeFormComponent},
    {path:'compteversListe/:action/compteID', component: CompteVersListeFormComponent},
    {path:'compteversListe/list', component: CompteVersListeComponent},


    {path:'liasse/ajout', component: LiasseFormComponent},
    {path:'liasse/:action/:liasseID', component: LiasseFormComponent},
    {path:'liasse/list', component: LiasseComponent},
  
    {path:'marqueAutomobile/ajout', component: MarqueAutoFormComponent},
    {path:'marqueAutomobile/:action/MarqueAutomobileID', component: GenreFormComponent},
    {path:'marqueAutomobile/list', component: MarqueAutomobileComponent},
  
  
    {path:'model/ajout', component: ModeleAutomobileFormComponent},
    {path:'model/:action/MarqueAutomobileID', component: ModeleAutomobileComponent},
    {path:'model/list', component: ModeleAutomobileComponent},
  
    {path:'proprietaire/ajout', component: ProprietaireFormComponent},
    {path:'proprietaire/ajout/:newProprio', component: ProprietaireFormComponent},
    {path:'proprietaire/:action/:ProprietaireID', component: ProprietaireComponent},
    {path:'proprietaire/list', component: ProprietaireComponent},
  
    {path:'sourceEnergie/ajout', component: SourceEnergieFormComponent},
    {path:'sourceEnergie/:action/:ProprietaireID', component: SourceEnergieComponent},
    {path:'sourceEnergie/list', component: SourceEnergieComponent},
  
    {path:'typeAutomobile/ajout', component: TypeAutomobileFormComponent},
    {path:'typeAutomobile/:action/:TypeAutomobileID', component: TypeAutomobileComponent},
    {path:'typeAutomobile/list', component: TypeAutomobileComponent},

    {path:'agent/ajout', component: AgentFormComponent},
    {path:'agent/:action/:agentID', component: AgentFormComponent},
    {path:'agent/list', component: AgentComponent},


    {path: "departement", component: DepartementComponent},
    {path: "les-societes", component: LesSocietesComponent},
    {path: "les-societes/nouveau", component: LesSocieteFormComponent},
    {path: "les-societes/nouveau/:newSocieteName", component: LesSocieteFormComponent},
    {path: "les-societes/update/:id", component: LesSocieteFormComponent},


    {path: "fonction", component: FonctionAgentComponent},

    {path: "compte/list", component: CompteComponent},
    {path: "compte/ajout", component: CompteFormComponent},
    {path: "compte/:action/:compteID", component: CompteFormComponent},

    {path: "arrondissement/list", component: ArrondissementComponent},
    {path: "arrondissement/ajout", component: ArrondissementFormComponent},
    {path: "arrondissement/:action/:ARRONDISSEMENTID", component: ArrondissementFormComponent},

    {path: "par.automobile", component: ParmAutomobileComponent},

    {path: "quartier/list", component: QuartierComponent},

    {path: "produit/list", component: ProduitComponent},
    {path: "produit/:action/:produitID", component: ProduitFormComponent},



    {path: "nationalite/list", component: NationaliteComponent},
    {path: "nationalite/ajout", component: NationaliteFormComponent},
    {path: "nationalite/:action/:NationaliteID", component: NationaliteFormComponent},



    {path: "ville/list", component: VilleComponent},
    {path: "ville/ajout", component: VilleFormComponent},
    {path: "ville/:action/:villeID", component: VilleFormComponent},

    {path: "calculEchéance/list", component: CalculEcheanceComponent},
    {path: "station/liste", component: StationsComponent},



    {path: "stationPointVente/liste", component: StationPointVenteComponent},
    {path: "stationPointVente/:action/:VENDEURSID", component: StationPointVenteComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VoitureRoutingModule {}