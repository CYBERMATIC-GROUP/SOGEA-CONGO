import { Component, OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { LoginService } from '../services/login.service';
import { routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  station!: Station | undefined
  titlePage!: string;
  routes = routesConstantes.stationService;

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.station = this.loginService.getStationStorage();
    this.titlePage =  'Espace station de service sous le login : "' + this.station?.CiodeStation + '"';
  }
}
