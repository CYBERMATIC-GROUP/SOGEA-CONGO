import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Station } from '../models/station.model';
import { StationsService } from '../services/sations.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StationsFormComponent } from './stations-form/stations-form.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  dataSource!: any;
  displayedColumns = ["NomStation", "Adresse"];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paramDialog = { 
    maxWidth: "700px"
  }

  constructor(
    private stationService: StationsService,
    public _location: Location,
    private dialog: MatDialog,
    private toast:ToastrService
  ){}

  ngOnInit(): void {
    this.initStationsList();
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  initStationsList(){
    this.isLoading = true;
    this.stationService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(data);
      this.isLoading = false;
    })
  }

  openNewFormStation(){
    const ref = this.dialog.open(StationsFormComponent, this.paramDialog);
    ref.componentInstance.action = "create"
  }

  view(station: Station){
    const ref = this.dialog.open(StationsFormComponent, this.paramDialog);
    ref.componentInstance.action = "view";
    ref.componentInstance.station = station;
  }
}
