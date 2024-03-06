import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { routesConstantes } from 'src/environements/constante';
import { Station } from '../models/station.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-station-dashboard',
  templateUrl: './station-dashboard.component.html',
  styleUrls: ['./station-dashboard.component.scss']
})
export class StationDashboardComponent implements OnInit {
  station!: Station | undefined
  @Input() titlePage!: string;
  routes = routesConstantes.stationService

  constructor(
    private globalService: GlobalService,
    public _location: Location,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
      this.station = this.loginService.getStationStorage();
  }


  onLogout(){
    this.globalService.logout()
  }
}
