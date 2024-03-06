import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Quartier } from '../models/quartier.model';
import { QuartierService } from '../services/quartier.service';
import { QuartierFormComponent } from './quartier-form/quartier-form.component';
import { Location } from '@angular/common';
import { Arrondissement } from '../models/arrondissement.model';
import { ArrondissementService } from '../services/arrondissement.service';
import { Departement } from '../models/departement.models';
import { DepartementService } from '../services/departement.service';
import { ToastrService  } from 'ngx-toastr';

@Component({
  selector: 'app-quartier',
  templateUrl: './quartier.component.html',
  styleUrls: ['./quartier.component.scss']
})
export class QuartierComponent {

  dataSource!: any;
  displayedColumns: string[] = ['NomQuartier','NomDepartement','NomArron', 'Actions'];
  QuartierList$!: Observable<Quartier[]>;

  ArrondissementtList!: Arrondissement[];

  DepartementList!: Departement[];

  isLoading!: boolean;
  arrondissement: any;
  sort: any;
  departement: any;

  constructor(

    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private quartierService : QuartierService,
    public _location:Location,
    private arrondissementService:ArrondissementService,
    private departementService: DepartementService,
    private toast:ToastrService

  ) {}

  ngOnInit(): void {
    this.getAllCategory();
    this.loadArrondissement()
    this.loadDepartement()
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
      this.ArrondissementtList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.departement = parametre;
    this.quartierService.RecuperationDepartement(this.departement).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.isLoading = false
    },
    (error) =>{
      console.log(error)
    }
    )

    this.quartierService.Recuperations(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ArrondissementtList =data
    },
        (error)=>{
          console.log(error)
        }
    )


  }



  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.arrondissement = parametre;
    this.quartierService.RecuperationArrondissement(this.arrondissement).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.isLoading = false
    },
    (error) =>{
      console.log(error)
    }
    )

  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.QuartierList$ = this.quartierService.getList("0").pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();
        this.isLoading = false;
        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );

    this.QuartierList$.subscribe((QuartierList) => {
      console.log(QuartierList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(QuartierList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClikLine(element: Quartier) {}

  openGenre(genre: Quartier) {
    console.log(genre);
  }

  edit(quartier: Quartier) {
    const dialog = this.dialog.open(QuartierFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDQUARTIER = quartier.IDQUARTIER;
  }

  create() {
    const dialog = this.dialog.open(QuartierFormComponent, {
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(quartier: Quartier) {
    const refview = this.dialog.open(QuartierFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDQUARTIER = quartier.IDQUARTIER;
  }

  

  delete(quartier:Quartier){

    const msg = "Voulez-vous retirer le quartier " + quartier.NomQuartier + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.quartierService.delete(quartier.IDQUARTIER).subscribe(data => {
          this.toast.success("quartier " + quartier.NomQuartier + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }
  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/quartier/list']);
    });
  }


}
