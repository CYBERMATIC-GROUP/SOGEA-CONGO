import { Component , OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Societe } from '../models/societe.model';
import { SocieteService } from '../services/societe.service';


@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent implements OnInit {
  IDSociete!: string;
  Nom!: string;
  Adresse!:string;
  TelFixe!:string;
  Mobile!: string;
  IDville!:string;
  Responsable!:string;
  Logo!:string;
  EnteteComptable!:string;
  EntereDirection!:string;
  RCCM!:string;
  NIU!:string;
  SCIET!:string;
  SCIEN!:string;
  IdentifiantSociete!:string
  Mail!:string;
  SiteWeb!:string;
  Licence!:string;
  Agrement!:string;
  CodeSociete!:string;
  isLoading!:boolean

    urlImage= "assets/images/sogea.jpg"

selectedFile!: File;



  constructor(
    private router:Router,
    private societeService: SocieteService,
    private dialog: MatDialog,
    private sociteService: SocieteService,
    public _location:Location
  ) { }

  ngOnInit(): void {

    this.initForUpdate()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  initForUpdate() {
    this.isLoading= true;
    this.sociteService.get("1").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);
      this.IDSociete = data.IDSociete;
      this.Nom = data.Nom;
      this.Adresse = data.Adresse;
      this.TelFixe = data.TelFixe;
      this.Mobile = data.Mobile;
      this.IDville = data.IDville;
      this.Responsable = data.Responsable;
      this.Logo = data.Logo;
      this.EnteteComptable = data.EnteteComptable;
      this.EntereDirection = data.EntereDirection;
      this.RCCM = data.RCCM;
      this.NIU = data.NIU;
      this.SCIET = data.SCIET;
      this.SCIEN = data.SCIEN;
      this.IdentifiantSociete = data.IdentifiantSociete;
      this.Mail = data.Mail;
      this.SiteWeb = data.SiteWeb;
      this.Licence = data.Licence;
      this.Agrement = data.Agrement;
      this.CodeSociete = data.CodeSociete;

      this.isLoading=false

      console.log(this.Logo)

    });
  }


  edit(IDSociete: string){
    this.router.navigateByUrl('voiture/societe/edit/' + IDSociete);
  }
}
