import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { Location } from '@angular/common';
import { throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Societe } from '../../models/societe.model';
import { SocieteService } from '../../services/societe.service';
import { Ville } from '../../models/ville.model';
import { VilleService } from '../../services/ville.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-societe-form',
  templateUrl: './societe-form.component.html',
  styleUrls: ['./societe-form.component.scss'],
})
export class SocieteFormComponent implements OnInit {
 
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
  isLoading!:boolean;
  isLoading2!: boolean
  imageSrc: string = "../assets/images/logo-social.png";
  message: string = "";

  newSocieteName!: string;

  VilleList!: Ville[];

selectedFile!: File;

action!: "edit" | "view";


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sociteService: SocieteService,
    public _location : Location,
    private villeService:VilleService,
    private toast:ToastrService
  ) {}


  ngOnInit(): void {
 
    const societeID = this.route.snapshot.params['societeID'];
    this.action = this.route.snapshot.params['action'];
    this.newSocieteName = this.route.snapshot.params['newSocieteName'];

    if (societeID){
     
      this.initForUpdate(societeID);
    }

    this.loadville()
    
  }



  

  initForUpdate(SocieteID: string) {
    this.isLoading = true;
    this.sociteService.get(SocieteID).subscribe((data) => {
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
      this.imageSrc = data.Logo

      console.log(this.Adresse)
      this.isLoading =false

    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }
  onSubmitSociete(form: NgForm) {
    const Societe: Societe = form.value;
    console.log(this.imageSrc);
    Societe.IDSociete = this.IDSociete

    if(this.imageSrc == "../assets/images/imageVide.png" ){
      this.imageSrc = ""

    }else{

      Societe.Logo = this.imageSrc

    }

    if (this.action === 'edit') {
      this.isLoading2 = true
      this.message= "Modification de la societé en cours"
      this.sociteService.update(Societe).subscribe(
        (data) => {
          console.log(data);
          
          this.isLoading2 = false
          console.log(data);
          const msg = "société " + Societe.Nom + " modifiée !";
          this.toast.success(msg, "mise à jour");
          this.dialog.closeAll();
          this.reloadPage();
        },
        (Error) => console.log(Error)
      );
    } else {
      this.sociteService.create(Societe).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data) => {
        console.log(data)
        
        if(this.newSocieteName){
          this.router.navigate(["/voiture/automobile/nouveau"]);
        }else{
          this.reloadPage();
        }

      }, error => console.log(error))
    }

  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/societe']);
    });
  }


  loadville() {
    this.villeService
      .getList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.VilleList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
