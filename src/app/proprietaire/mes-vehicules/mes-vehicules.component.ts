import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Automobile, filterAuto } from 'src/app/voiture/models/automobile.models';
import { Proprietaire } from 'src/app/voiture/models/proprietaire.model';
import { AutomobileService } from 'src/app/voiture/services/automobile.service';
import { AuthStorage, routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-mes-vehicules',
  templateUrl: './mes-vehicules.component.html',
  styleUrls: ['./mes-vehicules.component.scss']
})
export class MesVehiculesComponent implements OnInit {

  automobilesForProprio$!: Observable<Automobile[]>;
  
  constructor(
    private automobileService: AutomobileService
  ){}

  ngOnInit(): void {
      const proprioObj = localStorage.getItem(AuthStorage.proprietaire.proprietaire);

      if(proprioObj){
        const proprio: Proprietaire = JSON.parse(proprioObj);
        this.setAutomobiles(Number(proprio.IDProprietaire));
      }
  }

  //init automobile for proprietaire
  setAutomobiles(idProprio: number){
    const filtre: filterAuto = {IDProprietaire: idProprio}
    this.automobilesForProprio$ = this.automobileService.getList(filtre);
    this.automobilesForProprio$.subscribe(data => {
      console.log(data)
    })
  }
}
