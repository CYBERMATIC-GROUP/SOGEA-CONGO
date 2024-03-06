import { Component } from '@angular/core';

@Component({
  selector: 'app-viniette',
  templateUrl: './viniette.component.html',
  styleUrls: ['./viniette.component.scss']
})
export class VinietteComponent {

  onChangeSouscriptionSelected(event: any){
    console.log(event);
  }
}
