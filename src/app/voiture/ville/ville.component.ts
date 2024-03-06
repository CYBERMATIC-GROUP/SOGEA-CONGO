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
import { Ville } from '../models/ville.model';
import { VilleService } from '../services/ville.service';
import { VilleFormComponent } from './ville-form/ville-form.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent {

  dataSource!: any;
  displayedColumns: string[] = ['Libele', 'Actions'];
  VilleList$!: Observable<Ville[]>;

  isLoading!: boolean;

  constructor(

    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private villeService : VilleService,
    private toast:ToastrService

  ) {}

  ngOnInit(): void {
    this.getAllville();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllville() {
    this.isLoading = true;
    this.VilleList$ = this.villeService.getList().pipe(
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

    this.VilleList$.subscribe((VilleList) => {
      console.log(VilleList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(VilleList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClikLine(element: Ville) {}

  openGenre(nationalite: Ville) {
    console.log(nationalite);
  }

  edit(ville: Ville) {
    const dialog = this.dialog.open(VilleFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDville = ville.IDville;
  }

  create() {
    const dialog = this.dialog.open(VilleFormComponent, {
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(ville: Ville) {
    const refview = this.dialog.open(VilleFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDville = ville.IDville;
  }

  delete(ville:Ville){

    const msg = "Voulez-vous retirer la ville " + ville.Libele + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.villeService.delete(ville.IDville).subscribe(data => {
          this.toast.success("la ville " + ville.Libele + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/ville/list']);
    });
  }


}
