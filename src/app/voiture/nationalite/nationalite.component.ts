import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { GenreService } from '../services/genre.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { Nationalite } from '../models/nationalite.model';
import { NationaliteService } from '../services/nationalite.service';
import { NationaliteFormComponent } from './nationalite-form/nationalite-form.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nationalite',
  templateUrl: './nationalite.component.html',
  styleUrls: ['./nationalite.component.scss']
})
export class NationaliteComponent {

  dataSource!: any;
  displayedColumns: string[] = ['LibNationalite', 'Actions'];
  NationaliteList$!: Observable<Nationalite[]>;

  isLoading!: boolean;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private nationalite:NationaliteService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllnationalite();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllnationalite() {
    this.isLoading = true;
    this.NationaliteList$ = this.nationalite.getList().pipe(
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

    this.NationaliteList$.subscribe((genreList) => {
      console.log(genreList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(genreList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClikLine(element: Nationalite) {}

  openGenre(nationalite: Nationalite) {
    console.log(nationalite);
  }

  edit(nationalite: Nationalite) {
    const dialog = this.dialog.open(NationaliteFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDNationalite = nationalite.IDNationalite;
  }

  create() {
    const dialog = this.dialog.open(NationaliteFormComponent, {
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(nationalite: Nationalite) {
    const refview = this.dialog.open(NationaliteFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDNationalite = nationalite.IDNationalite;
  }

  delete(Nationalite:Nationalite){

    const msg = "Voulez-vous retirer la nationalité " + Nationalite.LibNationalite + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.nationalite.delete(Nationalite.IDNationalite).subscribe(data => {
          this.toast.success("nationalité " + Nationalite.LibNationalite + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/nationalite/list']);
    });
  }

}
