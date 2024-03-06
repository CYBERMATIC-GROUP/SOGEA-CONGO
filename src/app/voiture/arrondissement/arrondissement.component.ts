import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Arrondissement } from '../models/arrondissement.model';
import { ArrondissementService } from '../services/arrondissement.service';
import { ArrondissementFormComponent } from './arrondissement-form/arrondissement-form.component';
import { Location } from '@angular/common';
import { Departement } from '../models/departement.models';
import { DepartementService } from '../services/departement.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-arrondissement',
  templateUrl: './arrondissement.component.html',
  styleUrls: ['./arrondissement.component.scss']
})
export class ArrondissementComponent {

  dataSource!: any;
  displayedColumns: string[] = ['NomArron','Ordre','NomDepartement', 'Actions'];
  ArrondissementList$!: Observable<Arrondissement[]>;

  isLoading!: boolean;


  DepartementList!: Departement[];
  departement: any;
  sort: any;

  constructor(

    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private arrondissementService:ArrondissementService,
    public _location:Location,
    private toast: ToastrService,
    private departementService : DepartementService,
    private GlobalService:GlobalService

  ) {}

  ngOnInit(): void {
    this.getAllCategory();
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.ArrondissementList$ = this.arrondissementService.getList("0").pipe(
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

    this.ArrondissementList$.subscribe((ArrondissementList) => {
      console.log(ArrondissementList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(ArrondissementList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }





  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.departement = parametre;
    this.arrondissementService.RecuperationDepartement(this.departement).pipe(catchError((error:HttpErrorResponse)=>{
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




  onClikLine(element: Arrondissement) {}

  openGenre(genre: Arrondissement) {
    console.log(genre);
  }

  edit(arrondissement: Arrondissement) {
    const dialog = this.dialog.open(ArrondissementFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDARRONDISSEMENT = arrondissement.IDARRONDISSEMENT;
  }

  create() {
    const dialog = this.dialog.open(ArrondissementFormComponent, {
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(arrondissement: ArrondissementFormComponent) {
    const refview = this.dialog.open(ArrondissementFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDARRONDISSEMENT = arrondissement.IDARRONDISSEMENT;
  }


  delete(arrondissement:Arrondissement){

    const msg = "Voulez-vous retirer l'arrondissement " + arrondissement.NomArron + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.arrondissementService.delete(arrondissement.IDARRONDISSEMENT).subscribe(data => {
          this.toast.success("Arrondissement " + arrondissement.NomArron + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })

  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/arrondissement/list']);
    });
  }

}
