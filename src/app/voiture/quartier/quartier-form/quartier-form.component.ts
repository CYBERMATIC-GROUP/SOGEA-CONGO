import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Quartier } from '../../models/quartier.model';
import { QuartierService } from '../../services/quartier.service';
import { Arrondissement } from '../../models/arrondissement.model';
import { ArrondissementService } from '../../services/arrondissement.service';
import { Departement } from '../../models/departement.models';
import { DepartementService } from '../../services/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-quartier-form',
  templateUrl: './quartier-form.component.html',
  styleUrls: ['./quartier-form.component.scss']
})
export class QuartierFormComponent {


  IDQUARTIER!:string
  NomQuartier!:string
  IDDEPARTEMENT!:string
  IDARRONDISSEMENT!:string
  NomArron!:string
  NomDepartement!:string

  DepartementList!: Departement[];
  ArrondissementList!: Arrondissement[];

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private QuartierService : QuartierService,
    private arrondissementService : ArrondissementService,
    private departementService : DepartementService,
    public _location:Location,
    public dialog:MatDialog,
    private toast:ToastrService 
  
  ) {}

  ngOnInit(): void {

 
    if (this.IDQUARTIER) {
      
      this.initForUpdate(this.IDQUARTIER)
   }
    console.log(this.IDQUARTIER);
    console.log(this.action)

    this.loadDepartement()
    this.loadArrondissement()


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


  initForUpdate(QuartierID: string) {
    this.QuartierService.getOne(QuartierID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT
      this.IDQUARTIER = data.IDQUARTIER
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.NomArron = data.NomArron
      this.NomDepartement = data.NomDepartement
      this.NomQuartier = data.NomQuartier

    });
  }

  onSubmitForm(form: NgForm) {

    const quartier: Quartier = form.value;

    quartier.IDQUARTIER = this.IDQUARTIER;
  

    if (this.action === 'edit') {
      this.QuartierService
        .update(quartier)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "quartier " + quartier.NomQuartier + " modifié !";
            this.toast.success(msg, "mise à jour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.QuartierService
        .create(quartier)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            const msg = "quartier " + quartier.NomQuartier + " ajouté!";
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
      this.router.navigate(['/voiture/quartier/list']);
    });
  }

}
