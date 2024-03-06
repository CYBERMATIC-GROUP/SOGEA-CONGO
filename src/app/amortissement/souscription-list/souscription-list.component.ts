import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { Souscription } from 'src/app/models/souscription.model';
import { AmortissementService } from 'src/app/services/amortissement.service';

@Component({
  selector: 'app-souscription-list',
  templateUrl: './souscription-list.component.html',
  styleUrls: ['./souscription-list.component.scss']
})
export class SouscriptionListComponent implements OnInit {

  @Input() openForViniette: boolean = false;

  elementLineSelected!: any;
  dataSource!: any;
  isLoading!: boolean;
  displayedColumns = [
    "Immatriculation",
    "Proprietaire",
    "CapitalInteret",
    "DejaPaye",
    "Reste_du",
    "DateFin"
  ];
  isPdfLaoding!: boolean;
  selectedSouscription: Souscription[] = [];

  @Input() souscriptionListPassed!: Souscription[];

  constructor(
    private amortissementService: AmortissementService,
    public globalService: GlobalService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initSouscription()
  }

  applyFilter(event: any){

  }
  
  printViniette(){
    this.isPdfLaoding = true;
    this.amortissementService.printViniette(this.selectedSouscription[0].IDSOUSCRIPTIONS).subscribe(data => {
      this.isPdfLaoding = false;
      this.globalService.printFile(data.Etat)
    })
  }

  selectLine(element: Souscription){
    console.log(element);
    
    const routerLink ='/details-souscription/' + element.IDSOUSCRIPTIONS;

    if(this.openForViniette){
      const IsExist = this.selectedSouscription.find(elt => elt.IDSOUSCRIPTIONS == element.IDSOUSCRIPTIONS);
      if(!IsExist){
        this.selectedSouscription.push(element)
      }

      console.log(this.selectedSouscription)
    }else{
      this.router.navigate([routerLink]);
    }
  }

  removeSouscriptionFormLis(element: Souscription){
    const index = this.selectedSouscription.findIndex(elt => elt.IDSOUSCRIPTIONS == element.IDSOUSCRIPTIONS);

    const newArray = this.selectedSouscription.slice(0, index).concat(this.selectedSouscription.slice(index + 1));

    this.selectedSouscription = newArray;
  }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  initSouscription(){
    this.isLoading = true;

    if(!this.souscriptionListPassed){
      this.amortissementService.getSouscription().subscribe(res => {

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log(res);
        
      })
    }else{
      this.dataSource = new MatTableDataSource(this.souscriptionListPassed);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    }
  }
}
