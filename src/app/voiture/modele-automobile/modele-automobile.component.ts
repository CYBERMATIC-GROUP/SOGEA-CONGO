import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ModeleAutomobile } from '../models/modele.automobile.model';
import { ModeleAutomobileService } from '../services/modele.automobile.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ModeleAutomobileFormComponent } from 'src/app/voiture/modele-automobile/modele-automobile-form/modele-automobile-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modele-automobile',
  templateUrl: './modele-automobile.component.html',
  styleUrls: ['./modele-automobile.component.scss'],
})
export class ModeleAutomobileComponent implements OnInit {
  displayedColumns: string[] = ['NomType','Actions'];
  dataSource!: any;
  modeleAutoList$!: Observable<ModeleAutomobile[]>;
  isLoading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modeleAutoService: ModeleAutomobileService,
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllModeleAuto();
  }

  getAllModeleAuto() {
    this.modeleAutoList$ = this.modeleAutoService.getList().pipe(
      catchError((err, caught) => {
        console.log('err : ', err);
        console.log('caught : ', caught);

        this.isLoading = false;
        const ref = this.globalService.raiseErrorServer();

        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );

    this.modeleAutoList$.subscribe((modeleAutoList) => {
      console.log(modeleAutoList);

      this.dataSource = new MatTableDataSource(modeleAutoList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  create() {
    const dialog = this.dialog.open(ModeleAutomobileFormComponent, {
      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  edit(model: ModeleAutomobile) {
    const dialog = this.dialog.open(ModeleAutomobileFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDTypeAutomobile = model.IDTypeAutomobile;
  }

  view(model: ModeleAutomobile) {
    const refview = this.dialog.open(ModeleAutomobileFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDTypeAutomobile = model.IDTypeAutomobile;
  }

  delete(modele:ModeleAutomobile){

    const msg = "Voulez-vous retirer le model " + modele.NomType + " ?";
    const ref = this.globalService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.modeleAutoService.delete(modele.IDTypeAutomobile).subscribe(data => {
          this.toast.success("model " + modele.NomType + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/model/list']);
    });
  }
}
