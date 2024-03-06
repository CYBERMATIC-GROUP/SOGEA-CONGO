import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Compte } from '../../models/compte.model';
import { CompteService } from '../../services/compte.service';
import SogeaConstantes from 'src/environements/constante';
import { Liasse } from '../../models/liasse.model';
import { LiasseService } from '../../services/liasse.service';
import { CompteVersListe } from '../../models/compteVersListe.model';
import { CompteVersListeService } from '../../services/compte-vers-liste.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.scss'],
})
export class CompteFormComponent {
  IDCOMPTE!: string;
  CodeCompte!: string;
  LibelleCompte!: string;
  SoldeDebit!: string;
  SoldeCredit!: string;
  DateCreation!: string;
  LiasseDebit!: string;
  LiasseCredit!: string;
  SensDC!: string;
  CompteDeContrePartie!: string;
  CompteDeCumul!: string;
  CompteDeBanque!: string;
  CreePar!: string;
  PersonneAssociee!: string;
  TypePersonneAssociee!: string;
  ProduitAssocie!: string;
  EstUnChapitre!: string;
  DateModification!: string;
  nClasse!: string;

  LiasseList!:Liasse[];
  CompteList!:CompteVersListe[];

  isLoading:boolean = false;

  action!: 'edit' | 'view';

  CST_SENS_DC_Credit!: string;
  CST_SENS_DC_Debit!: string;
  CST_SENS_DC_Indetermine!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compteService: CompteService,
    private liasseService : LiasseService,
    private compte:CompteVersListeService,
    public _location:Location,
    public dialog:MatDialog,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.CST_SENS_DC_Credit = SogeaConstantes.CST_SENS_DC_Credit;
    this.CST_SENS_DC_Debit = SogeaConstantes.CST_SENS_DC_Debit;
    this.CST_SENS_DC_Indetermine = SogeaConstantes.CST_SENS_DC_Indetermine;

    const compteID = this.route.snapshot.params['compteID'];
    this.action = this.route.snapshot.params['action'];

    console.log(compteID);
    console.log(this.action);
    this.loadliasse()
    this.loadcompte()

    if (compteID) {
      this.initForUpdate(compteID);
    }
  }


  loadliasse(){
    this.liasseService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.LiasseList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  loadcompte(){
    this.compte.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.CompteList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(compteID: string) {
    this.isLoading = true
    this.compteService
      .getOne(compteID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          this.isLoading = false
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.IDCOMPTE = data["0"].IDCOMPTE
        this.CodeCompte = data["0"].CodeCompte  
        this.LibelleCompte = data["0"].LibelleCompte
        this.SoldeCredit = data["0"].SoldeCredit
        this.SoldeDebit = data["0"].SoldeDebit
        this.DateCreation = data["0"].DateCreation
        this.DateModification = data["0"].DateModification
        this.CompteDeBanque = data["0"].CompteDeBanque
        this.CompteDeContrePartie = data["0"].CompteDeContrePartie
        this.CompteDeCumul = data["0"].CompteDeCumul
        this.CreePar = data["0"].CreePar
        this.EstUnChapitre = data["0"].EstUnChapitre
        this.LiasseCredit = data["0"].LiasseCredit
        this.LiasseDebit = data["0"].LiasseDebit
        this.PersonneAssociee = data["0"].PersonneAssociee
        this.ProduitAssocie = data["0"].ProduitAssocie
        this.SensDC = data["0"].SensDC
        this.TypePersonneAssociee = data["0"].TypePersonneAssociee
        console.log(this.IDCOMPTE)

        this.isLoading = false  
      });
  }

  onSubmitForm(form: NgForm) {
    const compte: Compte = form.value;

    compte.IDCOMPTE = this.IDCOMPTE;

 

    if (this.action === 'edit') {
      this.compteService
        .update(compte)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "compte " + compte.LibelleCompte + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {

      // redefinitions
      compte.TypePersonneAssociee = SogeaConstantes.CST_TYPE_PERSONNE_PRODUIT;

      this.compteService
        .create(compte)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "compte " + compte.LibelleCompte + " ajouté !";
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
      this.router.navigate(['/voiture/compte/list']);
    });
  }
}
