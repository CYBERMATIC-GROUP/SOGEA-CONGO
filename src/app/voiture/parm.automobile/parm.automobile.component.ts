import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parm.automobile',
  templateUrl: './parm.automobile.component.html',
  styleUrls: ['./parm.automobile.component.scss']
})
export class ParmAutomobileComponent {

  constructor(private http:HttpClient){}

  
  // callApi() {
  //   this.http.get('http://51.178.29.100/sogeacongo/v1/Agents').subscribe((response) => {
  //     console.log(response); 
  //   });
  // }

}
