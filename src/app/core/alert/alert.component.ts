import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  title: string = "Alerte !"
  content!: string;
  type!: "danger" | "info" | "success";
  buttonOKName: string = "OK";
  buttonCancelName: string = "Annuler";


  ngOnInit(): void {
    
  }
}
