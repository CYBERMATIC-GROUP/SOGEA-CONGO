import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Genre } from '../models/genre.models';
import { GenreService } from '../services/genre.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { CompteVersListe } from '../models/compteVersListe.model';
import { CompteVersListeService } from '../services/compte-vers-liste.service';
import { CompteVersListeFormComponent } from './compte-vers-liste-form/compte-vers-liste-form.component';

@Component({
  selector: 'app-compte-vers-liste',
  templateUrl: './compte-vers-liste.component.html',
  styleUrls: ['./compte-vers-liste.component.scss']
})
export class CompteVersListeComponent {

  dataSource!: any;
  displayedColumns: string[] = ['LibelleCompte','CodeCompte', 'Actions'];
  compteList$!: Observable<CompteVersListe[]>;

  isLoading!: boolean;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private compte : CompteVersListeService
  ) {}

  ngOnInit(): void {
    this.getAllCompte();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCompte() {
    this.isLoading = true;
    this.compteList$ = this.compte.getList().pipe(
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

    this.compteList$.subscribe((compteList) => {
      console.log(compteList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(compteList);
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

  edit(compte: CompteVersListe) {
    const dialog = this.dialog.open(CompteVersListeFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDCOMPTE = compte.IDCOMPTE;
  }

  create() {
    const dialog = this.dialog.open(CompteVersListeFormComponent, {
    });

    dialog.componentInstance.action = 'create';
  }

  view(compte: CompteVersListe) {
    const refview = this.dialog.open(CompteVersListeFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDCOMPTE = compte.IDCOMPTE;
  }


  delete(compte: CompteVersListe) {
    const alert = this.dialog.open(AlertComponent)
    alert.componentInstance.type = "danger"
    alert.componentInstance.content = "voullez vous supprimer la fonction " + compte.IDCOMPTE + " ?"

    alert.afterClosed().subscribe((result) =>{

      if(result){
        this.compte.delete(compte.IDCOMPTE).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl("voiture/genre/list", { skipLocationChange: true })
            .then(() => {
             location.reload()
            });
        });
      }
    });
  }

}
