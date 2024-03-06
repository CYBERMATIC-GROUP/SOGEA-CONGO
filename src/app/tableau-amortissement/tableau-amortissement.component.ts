import { Component } from '@angular/core';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-tableau-amortissement',
  templateUrl: './tableau-amortissement.component.html',
  styleUrls: ['./tableau-amortissement.component.scss']
})
export class TableauAmortissementComponent {

  constructor(
    public globalService: GlobalService
  ){}
}
