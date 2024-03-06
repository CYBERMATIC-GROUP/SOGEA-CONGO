import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Genre } from '../models/genre.models';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeAutomobile } from '../models/type-automobile.models';
import { TypeAutomobileService } from '../services/type-automobile.service';
import { TypeAutomobileFormComponent } from './type-automobile-form/type-automobile-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { Agent } from '../models/agent.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-type-automobile',
  templateUrl: './type-automobile.component.html',
  styleUrls: ['./type-automobile.component.scss']
})
export class TypeAutomobileComponent {


  dataSource!: any;
  displayedColumns: string[] = ['NomType', 'Actions'];
  
  genreList$!: Observable<TypeAutomobile[]>;

  isLoading!: boolean;
  sessionAgent!:Agent

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private typeAutomobileService : TypeAutomobileService,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
    const agent = localStorage.getItem('agent');
    console.log(agent);
    if (agent) {
      this.sessionAgent = JSON.parse(agent);
      console.log(this.sessionAgent);

      this.getAllCategory();
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllCategory() {
    this.isLoading = true;
    this.genreList$ = this.typeAutomobileService.getList().pipe(
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

  edit(typeAutomobile: TypeAutomobile) {
    const dialog = this.dialog.open(TypeAutomobileFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDTypeAutomobile = typeAutomobile.IDTypeAutomobile;
  }

  create() {
    const dialog = this.dialog.open(TypeAutomobileFormComponent, {

      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(typeAutomobile: TypeAutomobile) {
    const refview = this.dialog.open(TypeAutomobileFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDTypeAutomobile = typeAutomobile.IDTypeAutomobile;
  }

  delete(TypeAutomobile:TypeAutomobile){

    const msg = "Voulez-vous retirer le type automobile " + TypeAutomobile.NomType + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.typeAutomobileService.delete(TypeAutomobile.IDTypeAutomobile).subscribe(data => {
          this.toast.success("Type Automobile " + TypeAutomobile.NomType + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/typeAutomobile/list']);
    });
  }
}
