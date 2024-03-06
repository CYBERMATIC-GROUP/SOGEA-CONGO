import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Genre } from '../models/genre.models';
import { GenreService } from '../services/genre.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  dataSource!: any;
  displayedColumns: string[] = ['GenreVoiture', 'Actions'];
  genreList$!: Observable<Genre[]>;

  isLoading!: boolean;

  constructor(
    private genreService: GenreService,
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.genreList$ = this.genreService.getList().pipe(
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

  edit(genre: Genre) {
    const dialog = this.dialog.open(GenreFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDGenre = genre.IDGenre;
  }

  create() {
    const dialog = this.dialog.open(GenreFormComponent, {

      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(genre: Genre) {
    const refview = this.dialog.open(GenreFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDGenre = genre.IDGenre;
  }

  delete(genre:Genre){

    const msg = "Voulez-vous retirer le genre vehicule " + genre.GenreVoiture + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.genreService.delete(genre.IDGenre).subscribe(data => {
          this.toast.success("genre voiture " + genre.GenreVoiture + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/genre']);
    });
  }
}
