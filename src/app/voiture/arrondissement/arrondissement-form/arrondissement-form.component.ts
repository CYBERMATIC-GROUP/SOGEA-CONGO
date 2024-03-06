import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Arrondissement } from '../../models/arrondissement.model';
import { ArrondissementService } from '../../services/arrondissement.service';
import { Departement } from '../../models/departement.models';
import { DepartementService } from '../../services/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-arrondissement-form',
  templateUrl: './arrondissement-form.component.html',
  styleUrls: ['./arrondissement-form.component.scss']
})
export class ArrondissementFormComponent {


  IDARRONDISSEMENT!:string
  NomArron!:string
  Ordre!:string
  IDDEPARTEMENT!:string
  NomDepartement!:string

  DepartementList!: Departement[];

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private router:Router,
    private ArrondissementService: ArrondissementService,
    public _location:Location,
    private departementService : DepartementService,
    public dialog :MatDialog,
    private toast:ToastrService

  
  ) {}

  ngOnInit(): void {

 
    this.loadDepartement()

    if (this.IDARRONDISSEMENT) {
      
      this.initForUpdate(this.IDARRONDISSEMENT)
   }
    console.log(this.IDARRONDISSEMENT);
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



  initForUpdate(ARRONDISSEMENTID: string) {
    this.ArrondissementService.getOne(ARRONDISSEMENTID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT;
      this.NomArron = data.NomArron;
      this.Ordre = data.Ordre;
      this.IDDEPARTEMENT = data.IDDEPARTEMENT;
      this.NomDepartement = data.NomDepartement;


    });
  }

  onSubmitForm(form: NgForm) {

    const arrondissement: Arrondissement = form.value;

    arrondissement.IDARRONDISSEMENT = this.IDARRONDISSEMENT;
    

    if (this.action === 'edit') {
      this.ArrondissementService
        .update(arrondissement)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "Arrondissement " + arrondissement.NomArron + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.ArrondissementService
        .create(arrondissement)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "Arrondissement " + arrondissement.NomArron + " ajouté!";
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
      this.router.navigate(['/voiture/arrondissement/list']);
    });
  }


}
