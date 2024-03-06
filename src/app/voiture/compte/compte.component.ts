import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Genre } from '../models/genre.models';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Compte } from '../models/compte.model';
import { CompteService } from '../services/compte.service';
import { CompteFormComponent } from './compte-form/compte-form.component';
import { Location } from '@angular/common';
import { Agent } from '../models/agent.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'],
})
export class CompteComponent {
  dataSource!: any;
  displayedColumns: string[] = [
    'CodeCompte',
    'LibelleCompte',
    'SoldeDebit',
    'SoldeCredit',
    'DateCreation',
    'Actions',
  ];

  compteList$!: Observable<Compte[]>;

  isLoading!: boolean;

  sessionAgent!: Agent;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private compteService: CompteService,
    public _location: Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    
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
    this.compteList$ = this.compteService.getList('0').pipe(
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

  edit(IDCOMPTE: string) {
    this.router.navigateByUrl('voiture/compte/edit/' + IDCOMPTE);
  }

  view(IDCOMPTE: string) {
    this.router.navigateByUrl('voiture/compte/view/' + IDCOMPTE);
  }

  delete(compte:Compte){

    const msg = "Voulez-vous retirer le compte " + compte.LibelleCompte + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.compteService.delete(compte.IDCOMPTE).subscribe(data => {
          this.toast.success("compte " + compte.LibelleCompte + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })

  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/compte/list']);
    });
  }
}
