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
import { Proprietaire } from '../models/proprietaire.model';
import { ProprietaireService } from '../services/proprietaire.service';
import { ProprietaireFormComponent } from './proprietaire-form/proprietaire-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss'],
})
export class ProprietaireComponent {
  dataSource!: any;
  Adresse!: string;
  displayedColumns: string[] = [
  
    'Nom',
    'Prenom',
    'Civilite',
    'TelFixe',
    'TelPortable',
    // 'eMail',
    // 'MotDePasse',
    // 'DateCreation',
    // 'NIU',
    'Adresse',
    'Actions',
  ];
  genreList$!: Observable<Proprietaire[]>;

  isLoading!: boolean;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private propritaireService: ProprietaireService,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.genreList$ = this.propritaireService.getList().pipe(
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

  openGenre(proprietaire: Proprietaire) {
    console.log(proprietaire);
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(proprietaire: Proprietaire) {
    const dialog = this.dialog.open(ProprietaireFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDProprietaire = proprietaire.IDProprietaire;
  }

  create() {
    const dialog = this.dialog.open(ProprietaireFormComponent, {
      maxWidth: '500px',
    });

    dialog.componentInstance.action = 'create';
  }

  view(proprietaire: ProprietaireFormComponent) {
    const refview = this.dialog.open(ProprietaireFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDProprietaire = proprietaire.IDProprietaire;
  }
  delete(Proprietaire:Proprietaire){

    const msg = "Voulez-vous retirer l'assuré " + Proprietaire.Nom + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.propritaireService.delete(Proprietaire.IDProprietaire).subscribe(data => {
          this.toast.success("l'assuré " + Proprietaire.Nom + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/proprietaire/list']);
    });
  }
}
