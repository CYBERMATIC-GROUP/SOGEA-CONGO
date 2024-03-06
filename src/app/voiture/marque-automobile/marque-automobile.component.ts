import { Component, ViewChild } from '@angular/core';
import { MarqueAutomobile } from '../models/marqueAutomobile';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MarqueAutomobileService } from '../services/marque-automobile.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MarqueAutoFormComponent } from './marque-auto-form/marque-auto-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-marque-automobile',
  templateUrl: './marque-automobile.component.html',
  styleUrls: ['./marque-automobile.component.scss'],
})
export class MarqueAutomobileComponent {
  dataSource!: any;
  displayedColumns: string[] = ['Marque', 'Actions'];
  marqueList$!: Observable<MarqueAutomobile[]>;

  isLoading!: boolean;

  constructor(
    private marqueAutoService: MarqueAutomobileService,
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
    this.marqueList$ = this.marqueAutoService.getList().pipe(
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

    this.marqueList$.subscribe((marqList) => {
      console.log(marqList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(marqList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClikLine(element: MarqueAutomobile) {}

  edit(marqueAutomobile: MarqueAutomobile) {
    const dialog = this.dialog.open(MarqueAutoFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDMarqueAutomobile =
      marqueAutomobile.IDMarqueAutomobile;
  }


  create() {
    const dialog = this.dialog.open(MarqueAutoFormComponent, {

      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(marqueAutomobile: MarqueAutomobile) {
    const refview = this.dialog.open(MarqueAutoFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDMarqueAutomobile =
      marqueAutomobile.IDMarqueAutomobile;
  }

  delete(marque:MarqueAutomobile){

    const msg = "Voulez-vous retirer la marque " + marque.Marque + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.marqueAutoService.delete(marque.IDMarqueAutomobile).subscribe(data => {
          this.toast.success("marque " + marque.Marque+ " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/marqueAutomobile/list']);
    });
  }
}