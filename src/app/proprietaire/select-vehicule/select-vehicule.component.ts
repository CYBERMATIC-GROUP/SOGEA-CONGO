import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Souscription } from 'src/app/models/souscription.model';
import { AmortissementService } from 'src/app/services/amortissement.service';
import { Proprietaire } from 'src/app/voiture/models/proprietaire.model';
import { AuthStorage } from 'src/environements/constante';

@Component({
  selector: 'app-select-vehicule',
  templateUrl: './select-vehicule.component.html',
  styleUrls: ['./select-vehicule.component.scss']
})
export class SelectVehiculeComponent implements OnInit {

  souscriptionsList$!: Observable<Souscription[]>;

  constructor(
    private amortissementService: AmortissementService,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    const proprioObj = localStorage.getItem(AuthStorage.proprietaire.proprietaire);
    if(proprioObj){
      const proprio: Proprietaire = JSON.parse(proprioObj);
      this.setSouscriptionForProprietaire(Number(proprio.IDProprietaire));
    }
  }

  setSouscriptionForProprietaire(idProprio: number){
    this.souscriptionsList$ = this.amortissementService.getSouscription(0, 0, 0, 0, idProprio);
  }
}
