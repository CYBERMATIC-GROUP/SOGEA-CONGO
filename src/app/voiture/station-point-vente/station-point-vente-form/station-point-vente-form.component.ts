import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Genre } from '../../models/genre.models';
import { Location } from '@angular/common';
import { StationPointVente } from '../../models/stationPointVente.model';
import { StationPointVenteService } from '../../services/station-point-vente.service';
import { Departement } from '../../models/departement.models';
import { DepartementService } from '../../services/departement.service';
import { Arrondissement } from '../../models/arrondissement.model';
import { ArrondissementService } from '../../services/arrondissement.service';
import { Quartier } from '../../models/quartier.model';
import { QuartierService } from '../../services/quartier.service';
import { Station } from '../../models/station.model';
import { StationsService } from '../../services/sations.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-station-point-vente-form',
  templateUrl: './station-point-vente-form.component.html',
  styleUrls: ['./station-point-vente-form.component.scss']
})
export class StationPointVenteFormComponent {

  IDVENDEURS!: number
  RaisonSocilale!: string
  Adresse!: string
  Mobile!: string
  AirtelMoney!: string
  MOMO!: string
  IdentifiantVendeur!: string
  IDARRONDISSEMENT!: number
  IDDEPARTEMENT!: string
  IDQUARTIER!: number
  NomPrenomResponsable!: string
  DateCreation!: string
  DateModification!: string
  IDSTATIONS!: number
  GPS_Latitude!: number
  GPS_Longitude!: number
  Arrodissement!: string
  Departement!: string
  Quartier!: string
  Compagnie!: string

  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];
  QuartierList!:Quartier[];
  StationList!:Station[];

  @Input() action !: "create" | "edit" | "view"


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private stationPointVente:StationPointVenteService,
    private departementService : DepartementService,
    private arrondissementService : ArrondissementService,
    private QuartierService : QuartierService,
    private StationService:StationsService,
    public _location:Location,
    public dialog:MatDialog,
    private toast:ToastrService
  
  
  ) {}

  ngOnInit(): void {

    if(this.IDVENDEURS) {
      this.initForUpdate(this.IDVENDEURS)
   }


   this.loadDepartement()
   this.loadArrondissement()
   this.loadQuartier()
   this.loadStation()

    console.log(this.IDVENDEURS);
    console.log(this.action)

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


  loadStation(){
    this.StationService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.StationList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  initForUpdate(VENDEURSID: number) {
    this.stationPointVente.getOne(VENDEURSID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDVENDEURS = data.IDVENDEURS
      this.RaisonSocilale = data.RaisonSocilale
      this.Adresse = data.Adresse
      this.Mobile = data.Mobile
      this.AirtelMoney = data.AirtelMoney
      this.MOMO = data.MOMO
      this.IdentifiantVendeur = data.IdentifiantVendeur
      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.IDQUARTIER = data.IDQUARTIER
      this.NomPrenomResponsable = data.NomPrenomResponsable
      this.DateCreation = data.DateCreation
      this.DateModification = data.DateModification
      this.IDSTATIONS = data.IDSTATIONS
      this.GPS_Latitude = data.GPS_Latitude
      this.GPS_Longitude = data.GPS_Longitude
      this.Arrodissement = data.Arrodissement
      this.Compagnie = data.Compagnie

    });
  }

  onSubmitForm(form: NgForm) {

    const stationPointVente: StationPointVente = form.value;

    stationPointVente.IDVENDEURS = this.IDVENDEURS;
  

    if (this.action === 'edit') {
      this.stationPointVente
        .update(stationPointVente)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "station point vente " + stationPointVente.IDVENDEURS + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.stationPointVente
        .create(stationPointVente)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "station point vente  " + stationPointVente.IDVENDEURS + " ajoutée!";
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
      this.router.navigate(['/voiture/stationPointVente/liste']);
    });
  }

}
