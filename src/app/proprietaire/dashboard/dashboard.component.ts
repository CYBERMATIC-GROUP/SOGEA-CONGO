import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tree!:any[];
  currentPath!: string;
  routes = routesConstantes.espaceProprietaire
  @Input() titlePage!: string

  constructor(
    public _location: Location,
    private router: Router,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
  }

  onLogout(){
    this.globalService.logout()
  }
}
