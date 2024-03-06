import { Component, Inject, OnInit } from '@angular/core';
import {
  DialogLesScoietesData,
  LesScoietes,
} from '../../models/les-societes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LesSocieteService } from '../../services/les-societe.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';
import { Departement } from '../../models/departement.models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-societe-form',
  templateUrl: './societe-form.component.html',
  styleUrls: ['./societe-form.component.scss'],
})
export class LesSocieteFormComponent implements OnInit {

  newSocieteName!: string;

  paramIDCategory!: number;
  lesScoietes!: LesScoietes;

  IDLesSocietes!: number;
  Logo!: string;
  NomSociete!: string;
  Adresse!: string;
  MatFiscale!: string;
  CP!: string;
  Ville!: string;
  Pays!: string;
  Tel!: string;
  Fax!: string;
  Email!: string;
  Web!: string;
  Echeance!: number;
  DateCreation!: string;
  RemiseEnPourcentage!: number;
  Status!: number;
  CodeSociete!: string;
  IDDEPARTEMENT!: number;
  DateModification!: string;

  departements!: Departement[];
  isUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private lesSocieteService: LesSocieteService,
    private router: Router,
    private departementService: DepartementService,
    private toast:ToastrService,
    public dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.newSocieteName = this.route.snapshot.params['newSocieteName'] ?? undefined;
    this.NomSociete = this.newSocieteName;

    this.loadDepartements();
    this.route.paramMap.subscribe((data) => {
      console.log(data.get('id'));

      if (data.get('id')) {
        this.isUpdate = true;
        this.loadSociete(data.get('id') as string);
      }
      
    });
  }

  loadSociete(id: string) {
    this.lesSocieteService
      .getOne(id)
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.IDLesSocietes = data.IDLesSocietes;
        this.Logo = data.Logo;
        this.NomSociete = data.NomSociete;
        this.Adresse = data.Adresse;
        this.MatFiscale = data.MatFiscale;
        this.CP = data.CP;
        this.Ville = data.Ville;
        this.Pays = data.Pays;
        this.Tel = data.Tel;
        this.Fax = data.Fax;
        this.Email = data.Email;
        this.Web = data.Adresse;
        this.Echeance = data.Echeance;
        this.DateCreation = data.DateCreation;
        this.RemiseEnPourcentage = data.RemiseEnPourcentage;
        this.Status = data.Status;
        this.CodeSociete = data.CodeSociete;
        this.IDDEPARTEMENT = data.IDDEPARTEMENT;
        this.DateModification = data.DateModification;
      });
  }

  createLesSocietes() {
    if (! this.NomSociete) {
      window.alert('Nom Societe est obligatoire')
      return
    }
    
    let payload: LesScoietes = {
      IDLesSocietes: this.IDLesSocietes,
      Logo: this.Logo,
      NomSociete: this.NomSociete,
      Adresse: this.Adresse,
      MatFiscale: this.MatFiscale,
      CP: this.CP,
      Ville: this.Ville,
      Pays: this.Ville,
      Tel: this.Tel,
      Fax: this.Fax,
      Email: this.Email,
      Web: this.Web,
      Echeance: this.Echeance,
      DateCreation: this.DateCreation,
      RemiseEnPourcentage: this.RemiseEnPourcentage,
      Status: this.Status,
      CodeSociete: this.CodeSociete,
      IDDEPARTEMENT: this.IDDEPARTEMENT,
      DateModification: this.DateCreation,
    };

    this.lesSocieteService
      .create(payload)
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);

        const msg = "la société " + payload.NomSociete + " ajoutée!";
        this.toast.success(msg, "Ajout");
        this.dialog.closeAll();
        this.reloadPage();
      });
  }

  updateLesSocietes() {

    if (! this.NomSociete) {
      window.alert('Nom Societe est obligatoire')
      return
    }

    let payload: LesScoietes = {
      IDLesSocietes: this.IDLesSocietes,
      Logo: this.Logo,
      NomSociete: this.NomSociete,
      Adresse: this.Adresse,
      MatFiscale: this.MatFiscale,
      CP: this.CP,
      Ville: this.Ville,
      Pays: this.Ville,
      Tel: this.Tel,
      Fax: this.Fax,
      Email: this.Email,
      Web: this.Web,
      Echeance: this.Echeance,
      DateCreation: this.DateCreation,
      RemiseEnPourcentage: this.RemiseEnPourcentage,
      Status: this.Status,
      CodeSociete: this.CodeSociete,
      IDDEPARTEMENT: this.IDDEPARTEMENT,
      DateModification: this.DateCreation,
    };

    this.lesSocieteService
      .update(payload)
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);
        const msg = "la société " + payload.NomSociete + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
      });
  }
  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/les-societes']);
    });
  }

  loadDepartements() {
    this.departementService
      .getList()
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.departements = data;
      });
  }

  pickLogo(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if ( fileList && fileList.length> 0 ) {
      console.log(fileList[0]);  
      
      let fileReader = new FileReader();
      fileReader.onload = (data:any) => {
        this.Logo = data.target.result   
        console.log( this.Logo ); 
      }
      fileReader.readAsDataURL(fileList[0])
      
    }   
   
    
  }
}
