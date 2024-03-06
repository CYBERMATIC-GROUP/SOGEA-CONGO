import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-sous-stations',
  templateUrl: './sous-stations.component.html',
  styleUrls: ['./sous-stations.component.scss']
})
export class SousStationsComponent implements OnInit {

  station!: Station | undefined;

  constructor(
    private loginSerivce: LoginService
  ){}

  ngOnInit(): void {
      this.station = this.loginSerivce.getStationStorage();
  }
}
