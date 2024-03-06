import { Component } from '@angular/core';
import { routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  route = routesConstantes;
}
