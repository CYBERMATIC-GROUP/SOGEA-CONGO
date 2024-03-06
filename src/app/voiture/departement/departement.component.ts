import { Component, OnInit, ViewChild } from '@angular/core';
import { Departement } from '../models/departement.models';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { DepartementService } from '../services/departement.service';
import { MatPaginator } from '@angular/material/paginator';
import { DeparementFormComponent } from './deparement-form/deparement-form.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss'],
})
export class DepartementComponent implements OnInit {
  displayedColumns: string[] = ['NomDepartement', 'CodeDepartement', 'action'];
  dataSource!: any;
  DepartementList$!: Observable<Departement[]>;

  isLoading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private DepartementService: DepartementService,
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDepartement();
  }

  getAllDepartement() {
    this.isLoading = true;
    this.DepartementList$ = this.DepartementService.getList().pipe(
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

    this.DepartementList$.subscribe((DepartementList) => {
      console.log(DepartementList);

      this.dataSource = new MatTableDataSource(DepartementList);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  delete(departement:Departement){

    const msg = "Voulez-vous retirer le departement " + departement.NomDepartement + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.DepartementService.delete(departement.IDDEPARTEMENT).subscribe(data => {
          this.toast.success("departement " + departement.NomDepartement + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })

  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/departement']);
    });
  }
  openEditDepartement(departement: Departement) {
    console.log(departement);
    this.dialog.open(DeparementFormComponent, {
      data: {
        departement: departement,
        action: 'update',
      },
    });
  }

  openAddDepartementModal() {
    let departement!: Departement;
    let dialogData = {
      departement: departement,
      action: 'create',
    };

    this.dialog.open(DeparementFormComponent, {
      data: dialogData,
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
