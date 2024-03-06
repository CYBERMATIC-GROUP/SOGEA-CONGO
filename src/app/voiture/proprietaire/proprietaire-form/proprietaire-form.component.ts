import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Genre } from '../../models/genre.models';
import { Location } from '@angular/common';
import { Proprietaire } from '../../models/proprietaire.model';
import { ProprietaireService } from '../../services/proprietaire.service';
import { Departement } from '../../models/departement.models';
import { DepartementService } from '../../services/departement.service';
import { Arrondissement } from '../../models/arrondissement.model';
import { ArrondissementService } from '../../services/arrondissement.service';
import { Quartier } from '../../models/quartier.model';
import { QuartierService } from '../../services/quartier.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proprietaire-form',
  templateUrl: './proprietaire-form.component.html',
  styleUrls: ['./proprietaire-form.component.scss']
})
export class ProprietaireFormComponent {

  newNamePassed!: string;


  IDProprietaire!: string
  IDDEPARTEMENT!:string
  IDQUARTIER!:string
  IDARRONDISSEMENT!:string
  eMail!: string
  MotDePasse!: string
  Civilite!: number
  Nom!: string
  Prenom!: string
  TelFixe!: string
  TelPortable!: string
  DateCreation!: string
  NIU!: string
  Adresse!: string

  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];
  QuartierList!:Quartier[];


  @Input() action !: "create" | "edit" | "view"


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private proprietaireService: ProprietaireService,
    private departementService : DepartementService,
    private arrondissementService : ArrondissementService,
    private QuartierService : QuartierService,
    public _location:Location,
    public dialog:MatDialog,
    private toast:ToastrService
  
  
  ) {}

  ngOnInit(): void {
    this.newNamePassed = this.route.snapshot.params['newProprio'] ?? undefined;
    this.Nom = this.newNamePassed;

    if (this.IDProprietaire) {
      
      this.initForUpdate(this.IDProprietaire)
   }
    console.log(this.IDProprietaire);
    console.log(this.action)

    this.loadDepartement()
    this.loadArrondissement()
    this.loadQuartier()


  }

  loadDepartement(){
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  onSelectionChange(event : any){
    console.log(event.target.value)
    this.QuartierService.Recuperations(this.IDDEPARTEMENT).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList= data
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadArrondissement(){
    this.arrondissementService.getList("0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  loadQuartier(){
    this.QuartierService.getList("0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.QuartierList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(ProprietaireID: string) {
    this.proprietaireService.getOne(ProprietaireID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDProprietaire = data.IDProprietaire;
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.IDQUARTIER = data.IDQUARTIER
      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT
      this.eMail = data.eMail;
      this.MotDePasse = data.MotDePasse;
      this.Civilite = data.Civilite;
      this.Nom = data.Nom;
      this.Prenom = data.Prenom;
      this.TelFixe = data.TelFixe;
      this.TelPortable = data.TelPortable;
      this.DateCreation = data.DateCreation;
      this.NIU = data.NIU;
      this.Adresse = data.Adresse;



    });
  }

  onSubmitForm(form: NgForm) {

    const proprietaire: Proprietaire = form.value;

    proprietaire.IDProprietaire = this.IDProprietaire;
  

    if (this.action === 'edit') {
      this.proprietaireService
        .update(proprietaire)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "l'assuré " + proprietaire.Nom + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.proprietaireService
        .create(proprietaire)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            if(this.newNamePassed){

              this.router.navigate(["/voiture/automobile/nouveau"]);

            }else{

              const msg = "l'assuré " + proprietaire.Nom + " ajouté!";
              this.toast.success(msg, "Ajout");
              this.dialog.closeAll();
              this.reloadPage();

            }

          },
          (error) => console.log(error)
        );
    }
  }
  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/proprietaire/list']);
    });
  }
}
