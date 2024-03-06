import { Component, Input, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/core/models/departement.model';
import { DepartementService } from 'src/app/core/services/departement.service';
import { Station } from 'src/app/station-service/models/station.model';
import { Agent } from 'src/app/voiture/models/agent.model';
import { Arrondissement } from 'src/app/voiture/models/arrondissement.model';
import { Quartier } from 'src/app/voiture/models/quartier.model';
import { StationPointVente } from 'src/app/voiture/models/stationPointVente.model';
import { ArrondissementService } from 'src/app/voiture/services/arrondissement.service';
import { QuartierService } from 'src/app/voiture/services/quartier.service';
import { StationsService } from 'src/app/voiture/services/sations.service';
import { StationPointVenteService } from 'src/app/voiture/services/station-point-vente.service';
import { StationPointVenteFormComponent } from 'src/app/voiture/station-point-vente/station-point-vente-form/station-point-vente-form.component';


@Component({
  selector: 'app-station-points-vente',
  templateUrl: './station-points-vente.component.html',
  styleUrls: ['./station-points-vente.component.scss']
})
export class StationPointsVenteComponent {
  dataSource!: any;
  displayedColumns: string[] = [
    'RaisonSocilale',
    'Adresse',
    'Mobile',
    'Actions',
  ];
  @Input() IDStation!: number;

  stationPointVenteList$!: Observable<StationPointVente[]>;
  ArrondissementtList!: Arrondissement[];
  DepartementList!: Departement[];
  QuartierList!: Quartier[];
  StationList!: Station[];
  VendeursList!: StationPointVente[];
  isLoading!: boolean;
  arrondissement: any;
  sort: any;
  departement: any;
  quartier: any;
  station: any;

  sessionAgent!:Agent

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    private stationPointVenteService: StationPointVenteService,
    public _location: Location,
    private arrondissementService: ArrondissementService,
    private departementService: DepartementService,
    private quartierService: QuartierService,
    private stationService: StationsService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllstationPointVente();
    this.loadArrondissement();
    this.loadDepartement();
    this.loadQuartier();
    this.loadStation();
    this.loadVendeur();

    const agent = localStorage.getItem('agent');
    console.log(agent);
    if (agent) {
      this.sessionAgent = JSON.parse(agent);
      console.log(this.sessionAgent);
    }

    if(this.IDStation){
      this.station = this.IDStation
    }
  }

  loadStation() {
    this.stationService
      .getList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.StationList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadVendeur() {
    this.stationPointVenteService
      .RecuperationVendeurs("0")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.VendeursList = data;
          console.log(this.VendeursList)
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadQuartier() {
    this.quartierService
      .getList("0")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.QuartierList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadDepartement() {
    this.departementService
      .getList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.DepartementList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadArrondissement() {
    this.arrondissementService
      .getList("0")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.ArrondissementtList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadListeStationPointVente() {
    this.stationPointVenteService
      .RecuperationCycle(
        this.departement,
        this.arrondissement,
        this.quartier,
        this.station
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSelectionChangeStation(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;

    this.station = parametre;

    this.loadListeStationPointVente();

    this.stationPointVenteService
      .RecuperationStation(this.station)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );


    this.stationPointVenteService.Recuperations(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ArrondissementtList =data
    },
        (error)=>{
          console.log(error)
        }
    )
  }

  onSelectionChangequartier(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;

    this.quartier = parametre;

    this.loadListeStationPointVente();

    this.stationPointVenteService
      .RecuperationQuartier(this.quartier)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSelectionChange(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;

    this.departement = parametre;

    this.loadListeStationPointVente(); 
  }

  onSelectionChanges(event: any) {
    console.log(event.target.value);
    const parametre = event.target.value;
    this.isLoading = true;

    this.arrondissement = parametre;

    this.loadListeStationPointVente();

    this.stationPointVenteService
      .RecuperationArrondissements(this.arrondissement)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );



      this.stationPointVenteService.Recuperation_Quartier_Arr(parametre).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data)=>{
        console.log(data)
        this.QuartierList =data
      },
          (error)=>{
            console.log(error)
          }
      )



  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllstationPointVente() {
    this.isLoading = true;
    this.stationPointVenteList$ = this.stationPointVenteService.getList().pipe(
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

    this.stationPointVenteList$.subscribe((stationPointVenteList) => {
      console.log(stationPointVenteList);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(stationPointVenteList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onClikLine(element: StationPointVente) {}

  openGenre(genre: StationPointVente) {
    console.log(genre);
  }

  edit(stationPointVente: StationPointVente) {
    const dialog = this.dialog.open(StationPointVenteFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDVENDEURS = stationPointVente.IDVENDEURS;
  }

  create() {
    const dialog = this.dialog.open(StationPointVenteFormComponent, {});

    dialog.componentInstance.action = 'create';
  }

  view(stationPointVente: StationPointVente) {
    const refview = this.dialog.open(StationPointVenteFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDVENDEURS = stationPointVente.IDVENDEURS;
  }

  delete(Station:StationPointVente){

    const msg = "Voulez-vous retirer le point de vente  " + Station.IDVENDEURS + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.stationPointVenteService.delete(Station.IDVENDEURS).subscribe(data => {
          this.toast.success("station point vente " + Station.IDVENDEURS + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/stationPointVente/liste']);
    });
  }
  
}
