import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';
import { FonctionAgent } from '../../models/fonctionAgent.model';
import { FonctionAgentService } from '../../services/fonction-agent.service';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { Ville } from '../../models/ville.model';
import { VilleService } from '../../services/ville.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent {

  IDagent!: number;
  Nom!: string;
  Prenom!: string;
  eMail!: string;
  Civilite!: number;
  TelFixe!: string;
  TelPortable!: string;
  Adresse!: string;
  DateNaissance!: string;
  LieuNaissance!: string;
  Nationalite!: number;
  MotDePasse!: string;
  login!: string;
  Photo!:string;
  DateCreation!: string;
  DateModification!: string;
  bCompteActif!: boolean;
  bDroitAjouterProduit!: boolean;
  bDateExpiration!: boolean;
  bDroitValiderCommande!: boolean;
  bAdminidtrateur!: boolean;
  bdroitAjouterAgent!: boolean;
  IDFonction_agent!: number;
  IDville!: number;
  bCotiseSecuriteSocial!: boolean;
  bPayeImpot!: boolean;
  SalaireBase!: number;
  NumCompteBancaire!: string;
  NumSecuriteSocial!: string;
  NombrePartsImpot!: number;
  IDCOMPTE!: number;
  IDCAISSE!: number;
  NombreEnfants!: number;
  SituationFamiliale!: number;
  Status!: number;
  bDroitRealiserControle!: boolean;
  bDroitEncaisser!: boolean;
  bDroitGererCaisse!: boolean;
  bAjouterTypeAutomobile!: boolean;
  bDroitAjouterAotomobile!: boolean;
  bDroitSupprimerEcriture!: boolean;
  bDroitGererProduitAssurence!: boolean;
  bEstAdministrateurProduitsAssurences!: boolean;
  bDroitGererAgents!: boolean;
  bDroitImprimerStatistiques!: boolean;
  bDroitGererProduitsControleTechniques!: boolean;
  bDroitImprimerVignette!: boolean;
  bDroitImprimerContrat!: boolean;
  bSuperUtilisateur!: boolean;

  isLoading!:boolean

  selectedFile!: File;
  image: string = 'assets/images/avatars/profile-image-2.png';

  FonctionAgentList!: FonctionAgent[];
  NationaliteList!: Nationalite[];
  VilleList!: Ville[];



  action!: 'edit' | 'view' | 'create';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private fonctionAgentService:FonctionAgentService,
    private NationaliteService : NationaliteService,
    private VilleService:VilleService,
    private toast: ToastrService,
    public _location:Location,
    private dialog:MatDialog
  ) {}

  

  ngOnInit(): void {

    const agentID = this.route.snapshot.params['agentID'];
    this.action = this.route.snapshot.params['action'];

    console.log(agentID);
    console.log(this.action)

    if (agentID) {
      this.initForUpdate(agentID);
    }

    this.loadFonctionAgent()
    this.loadNationalite()
    this.loadVille()

  }


  loadFonctionAgent(){
    this.fonctionAgentService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.FonctionAgentList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadNationalite(){
    this.NationaliteService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.NationaliteList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadVille(){
    this.VilleService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.VilleList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(agentID: number) {
    this.isLoading = true
    this.agentService
      .getOne(agentID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        this.isLoading = true
        console.log(data);
        this.isLoading = false

        this.IDagent = data.IDagent;
        this.Nom = data.Nom;
        this.Prenom = data.Prenom;
        this.eMail = data.eMail;
        this.Civilite = data.Civilite;
        this.TelFixe = data.TelFixe;
        this.TelPortable = data.TelPortable;
        this.Adresse = data.Adresse;
        this.DateNaissance = data.DateNaissance;
        this.LieuNaissance = data.LieuNaissance;
        this.Nationalite = data.Nationalite;
        this.MotDePasse = data.MotDePasse;
        this.login = data.login;
        this.Photo = data.Photo;
        this.DateCreation = data.DateCreation;
        this.DateModification = data.DateModification;
        this.bCompteActif = data.bCompteActif;
        this.bDroitAjouterProduit = data.bDroitAjouterProduit;
        this.bDateExpiration = data.bDateExpiration;
        this.bDroitValiderCommande = data.bDroitValiderCommande;
        this.bAdminidtrateur = data.bAdminidtrateur;
        this.bdroitAjouterAgent = data.bdroitAjouterAgent;
        this.IDFonction_agent = data.IDFonction_agent;
        this.IDville = data.IDville;
        this.bCotiseSecuriteSocial = data.bCotiseSecuriteSocial;
        this.bPayeImpot = data.bPayeImpot;
        this.SalaireBase = data.SalaireBase;
        this.NumCompteBancaire = data.NumCompteBancaire;
        this.NumSecuriteSocial = data.NumSecuriteSocial;
        this.NombrePartsImpot = data.NombrePartsImpot;
        this.IDCOMPTE = data.IDCOMPTE;
        this.IDCAISSE = data.IDCAISSE;
        this.NombreEnfants = data.NombreEnfants;
        this.SituationFamiliale = data.SituationFamiliale;
        this.Status = data.Status;
        this.bDroitRealiserControle = data.bDroitRealiserControle;
        this.bDroitEncaisser = data.bDroitEncaisser;
        this.bDroitGererCaisse = data.bDroitGererCaisse;
        this.bAjouterTypeAutomobile = data.bAjouterTypeAutomobile;
        this.bDroitAjouterAotomobile = data.bDroitAjouterAotomobile;
        this.bDroitSupprimerEcriture = data.bDroitSupprimerEcriture;
        this.bDroitGererProduitAssurence = data.bDroitGererProduitAssurence;
        this.bEstAdministrateurProduitsAssurences = data.bEstAdministrateurProduitsAssurences;
        this.bDroitGererAgents = data.bDroitGererAgents;
        this.bDroitImprimerStatistiques = data.bDroitImprimerStatistiques;
        this.bDroitGererProduitsControleTechniques = data.bDroitGererProduitsControleTechniques;
        this.bDroitImprimerVignette = data.bDroitImprimerVignette;
        this.bDroitImprimerContrat = data.bDroitImprimerContrat;
        this.bSuperUtilisateur = data.bSuperUtilisateur;
        this.image = data.Photo
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
    };
  }

  onSubmitForm(form: NgForm) {

    
    const agent: Agent = form.value;
    agent.IDagent = this.IDagent;


   
    if(this.image == "../assets/images/imageVide.png" ){
      this.image = ""

    }else{

      agent.Photo = this.image

    }


    if (this.action === 'edit') {
      this.agentService
        .update(agent)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "Agent " + agent.Nom + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.agentService
        .create(agent)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            this.Photo = this.image
            console.log(data);
            const msg = "Agent " + agent.Nom + " ajouté !";
            this.toast.success(msg, "Ajout");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    }
  }
  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/agent/list']);
    });
  }
}
