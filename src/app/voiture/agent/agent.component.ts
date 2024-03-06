import { Component, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Agent } from '../models/agent.model';
import { AgentService } from '../services/agent.service';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent {
  dataSource!: any;
  displayedColumns: string[] = [
    'nom',
    'Prenom',
    'Civilite',
    'TelFixe',
    'TelPortable',
    'Adresse',
    // 'IDFonction_agent',
    'Actions',
  ];
  genreList$!: Observable<Agent[]>;

  isLoading!: boolean;
  sessionAgent! : Agent;

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private agentService: AgentService,
    public _location: Location,
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
    this.genreList$ = this.agentService.getList().pipe(
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

  onClikLine(element: Agent) {}

  openGenre(agent: Agent) {
    console.log(agent);
  }

  edit(IDagent: string) {
    this.router.navigateByUrl('voiture/agent/edit/' + IDagent);
  }

  view(IDagent: string) {
    this.router.navigateByUrl('voiture/agent/view/' + IDagent);
  }

  delete(Agent:Agent){

    const msg = "Voulez-vous retirer l'agent " + Agent.Nom + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.agentService.delete(Agent.IDagent).subscribe(data => {
          this.toast.success("Agent " + Agent.Nom + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })

  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/agent/list']);
    });
  }
}
