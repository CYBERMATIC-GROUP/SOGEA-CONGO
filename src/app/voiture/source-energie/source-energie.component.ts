import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Genre } from '../models/genre.models';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceEnergie } from '../models/source-energie';
import { SourceEnergieService } from '../services/source-energie.service';
import { SourceEnergieFormComponent } from './source-energie-form/source-energie-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-source-energie',
  templateUrl: './source-energie.component.html',
  styleUrls: ['./source-energie.component.scss']
})
export class SourceEnergieComponent {

   dataSource!: any;
  displayedColumns: string[] = ['SourceEnergie', 'Actions'];
  
  genreList$!: Observable<SourceEnergie[]>;

  isLoading!: boolean;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private sourceEnergie : SourceEnergieService,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.genreList$ = this.sourceEnergie.getList().pipe(
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

    this.genreList$.subscribe((genreList) => {
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

  onClikLine(element: Genre) {}

  openGenre(genre: Genre) {
    console.log(genre);
  }

  edit(sourceEnergie: SourceEnergie) {
    const dialog = this.dialog.open(SourceEnergieFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDSourceEnergie = sourceEnergie.IDSourceEnergie;
  }

  create() {
    const dialog = this.dialog.open(SourceEnergieFormComponent, {

      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(sourceEnergie: SourceEnergie) {
    const refview = this.dialog.open(SourceEnergieFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDSourceEnergie = sourceEnergie.IDSourceEnergie;
  }

  delete(source:SourceEnergie){

    const msg = "Voulez-vous retirer la source energie " + source.SourceEnergie + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.sourceEnergie.delete(source.IDSourceEnergie).subscribe(data => {
          this.toast.success("source energie  " + source.IDSourceEnergie + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }
    })
  }
  

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/sourceEnergie/list']);
    });
  }

}
