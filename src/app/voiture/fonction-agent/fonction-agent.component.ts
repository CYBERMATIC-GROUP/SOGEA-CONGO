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
import { FonctionAgentFormComponent } from './fonctionAgent/fonction-agent-form/fonction-agent-form.component';
import { FonctionAgent } from '../models/fonctionAgent.model';
import { FonctionAgentService } from '../services/fonction-agent.service';
import { Location } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fonction-agent',
  templateUrl: './fonction-agent.component.html',
  styleUrls: ['./fonction-agent.component.scss']
})
export class FonctionAgentComponent {

  dataSource!: any;
  displayedColumns: string[] = ['Libele', 'Actions'];
  genreList$!: Observable<FonctionAgent[]>;

  isLoading!: boolean;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private fonctionService : FonctionAgentService,
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
    this.genreList$ = this.fonctionService.getList().pipe(
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

  edit(fonction: FonctionAgent) {
    const dialog = this.dialog.open(FonctionAgentFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDFonction_agent = fonction.IDFonction_agent;
  }

  create() {
    const dialog = this.dialog.open(FonctionAgentFormComponent, {
      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
  }

  view(fonction: FonctionAgent) {
    const refview = this.dialog.open(FonctionAgentFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDFonction_agent = fonction.IDFonction_agent;
  }


  delete(fonction:FonctionAgent){

    const msg = "Voulez-vous retirer la fonction " + fonction.Libele + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.fonctionService.delete(fonction.IDFonction_agent).subscribe(data => {
          this.toast.success("fonction " + fonction.Libele + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/fonction']);
    });
  }

}
