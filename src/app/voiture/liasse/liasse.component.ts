import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Liasse } from '../models/liasse.model';
import { LiasseFormComponent } from './liasse-form/liasse-form.component';
import { LiasseService } from '../services/liasse.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { GlobalService } from 'src/app/core/services/global.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-liasse',
  templateUrl: './liasse.component.html',
  styleUrls: ['./liasse.component.scss']
})
export class LiasseComponent {

  dataSource!: any;
  displayedColumns = [
    'CodeLiasse',
    'LibelleLiasse',
    'Actions',
  ];
  isLoading!: boolean

  constructor(
    private liasse: LiasseService,
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private globalService:GlobalService,
    private toast:ToastrService
  ) { }

  ngOnInit(): void {
    this.initLiasse();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initLiasse() {
    this.isLoading = true
    this.liasse.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.liasse.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  edit(liasse: Liasse) {
    const ref = this.dialog.open(LiasseFormComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }


  view(liasse: Liasse) {
    const refview = this.dialog.open(LiasseFormComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }

  create() {
    const refview = this.dialog.open(LiasseFormComponent, {
    });
     refview.componentInstance.action = 'create';
  }




  delete(liasse:Liasse){

    const msg = "Voulez-vous retirer la liasse " + liasse.LibelleLiasse + " ?";
    const ref = this.globalService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.liasse.delete(liasse.IDLIASSE).subscribe(data => {
          this.toast.success("liasse " + liasse.LibelleLiasse + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/liasse/list']);
    });
  }

}
