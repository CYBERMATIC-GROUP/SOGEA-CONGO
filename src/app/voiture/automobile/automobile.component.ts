import { Component, Input, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Automobile } from '../models/automobile.models';
import { MatPaginator } from '@angular/material/paginator';
import { AutomobileService } from '../services/automobile.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from './automobile-form/filter/filter.component';
import { Agent } from '../models/agent.model';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss']
})
export class AutomobileComponent {
  dataSource!:any;
  displayedColumns: string[] = ['Nom', 'Immatriculation','MarqueAutomobile','TypeAutomobile', 'Genre' ];
  isLoading!: boolean;

  sessionAgent!:Agent

  elementSelected!: Automobile;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @Input() isOpenForArmotissement: boolean = false;
  autoSelected!: Automobile;

  @Input() automobilesPassed!: Automobile[];

  constructor(
    private automobileService : AutomobileService,
    private globalService : GlobalService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() : void {
    this.getAllAutomobiles();

    const agent = localStorage.getItem('agent');
    console.log(agent);
    if (agent) {
      this.sessionAgent = JSON.parse(agent);
      console.log(this.sessionAgent);
    }
  }

  getAllAutomobiles() {
    this.isLoading = true;

    if(!this.automobilesPassed){
      let automobiles$!: Observable<Automobile[]>;

      automobiles$ = this.automobileService.getList().pipe(
        catchError((err, caught) => {
          console.log('err : ', err);
          console.log('caught : ', caught);
          this.isLoading = false;
          const ref = this.globalService.raiseErrorServer();
          this.isLoading = false;
          ref.afterClosed().subscribe( result => {
            this.router.navigate(['/']);
          })
          return EMPTY;
        })
      )
  
      automobiles$.subscribe(aumobileList => {
        console.log(aumobileList);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(aumobileList);
        this.dataSource.paginator = this.paginator;
      })
    }else{
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.automobilesPassed);
      this.dataSource.paginator = this.paginator;
    }

  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  selectLine(element: Automobile){
    this.elementSelected = element;
    if (this.isOpenForArmotissement){
      const ref = this.globalService.alert("Slection du véhicule " + element.nom + ". Voulez-vous continuer ? ", "Selection", "info", "Non", "Oui");

      ref.afterClosed().subscribe(res => {
        if(res){
          this.autoSelected = element;
          this.dialog.closeAll();
        }
      })
      
    }else{
      this.router.navigate(['/voiture/automobile/view/' + element.IDAutomobiles]);
    }
  }

  edit(){
    this.router.navigateByUrl('/voiture/automobile/update/' + this.elementSelected.IDAutomobiles)
  }

  view(){
    this.router.navigate(['/voiture/automobile/view/' + this.elementSelected.IDAutomobiles]);
  }

  openFilter(){
    const ref = this.dialog.open(FilterComponent);
    ref.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        const autoFiltre: Automobile = ref.componentInstance.resultFiltre;

        this.automobileService.filtrer(autoFiltre).pipe(
          catchError((err, caught) => {
            console.log(err);
            console.log(caught);
            this.globalService.raiseErrorServer("Erreur serveur: Impossible de filtrer les automobiles");
            this.isLoading = false;
            return EMPTY;
          })
        ).subscribe(aumobileList => {
            console.log(aumobileList);
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(aumobileList);
            this.dataSource.paginator = this.paginator;
        })
      }
    })
  }
}
