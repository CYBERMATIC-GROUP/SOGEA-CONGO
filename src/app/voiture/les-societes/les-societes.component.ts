import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DialogLesScoietesData,
  LesScoietes,
} from '../models/les-societes.model';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { LesSocieteService } from '../services/les-societe.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SocieteFormComponent } from '../societe/societe-form/societe-form.component';
import { LesSocieteFormComponent } from './societe-form/societe-form.component';
import { SocieteService } from '../services/societe.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-les-societes',
  templateUrl: './les-societes.component.html',
  styleUrls: ['./les-societes.component.scss'],
})
export class LesSocietesComponent implements OnInit {
  displayedColumns: string[] = [
    'NomSociete',
    'Adresse',
    'MatFiscale',
    'CP',
    'Ville',
    'Pays',
    'Echeance',
    'action',
  ];
  dataSource!: any;
  LesScoietesList$!: Observable<LesScoietes[]>;

  isLoading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private LesScoietesService: LesSocieteService,
    private globaService: GlobalService,
    private router: Router,
    private toast:ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllLesScoietes();
  }

  getAllLesScoietes() {
    this.isLoading = true;
    this.LesScoietesList$ = this.LesScoietesService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();

        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );

    this.LesScoietesList$.subscribe((LesScoietesList) => {
      console.log(LesScoietesList);

      this.dataSource = new MatTableDataSource(LesScoietesList);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }




  deleteLesScoietes(societe: LesScoietes){

    const msg = "Voulez-vous retirer la société " + societe.NomSociete + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.LesScoietesService.delete(societe.IDLesSocietes).subscribe(data => {
          this.toast.success("fonction " + societe.NomSociete + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/les-societes']);
    });
  }

  openEditLesScoietes(societe: LesScoietes) {
    let dialogData: DialogLesScoietesData = {
      societe: societe,
      action: 'update',
    };
    // this.dialog.open(LesSocieteFormComponent, {
    //   data: dialogData,
    // });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/les-societes/update/'+ societe.IDLesSocietes]);
    });
  }

  openAddLesScoietesModal() {
    let societe!: LesScoietes;
    let dialogData: DialogLesScoietesData = {
      societe: societe,
      action: 'create',
    };

    // this.dialog.open(LesSocieteFormComponent, {
    //   data: dialogData,
    // });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/les-societes/nouveau']);
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
