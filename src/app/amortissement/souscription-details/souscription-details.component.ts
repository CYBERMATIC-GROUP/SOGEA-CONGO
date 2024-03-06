import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { Souscription } from 'src/app/models/souscription.model';
import { AmortissementService } from 'src/app/services/amortissement.service';
import { SouscriptionFormComponent } from '../souscription-form/souscription-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-souscription-details',
  templateUrl: './souscription-details.component.html',
  styleUrls: ['./souscription-details.component.scss']
})
export class SouscriptionDetailsComponent implements OnInit {
  
  isLoading!: boolean;
  echeancesIsLoading!: boolean
  souscritpion!: Souscription;
  IDSOUSCRIPTIONS!: number;
  waitingMessage!: string;
  printLoading!: boolean;

  dataSource!: any;

  displayedColumns = [
    "Numero",
    "Mensualite",
    "Versement",
    "CapitalRembourse",
    "Interet"
  ]

  constructor(
    public globalService: GlobalService,
    private amortissementService: AmortissementService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    const IDSOUSCRIPTIONS = this.IDSOUSCRIPTIONS = +this.route.snapshot.params['IDSOUSCRIPTIONS'];
    
    if(!IDSOUSCRIPTIONS){
      const ref = this.globalService.alert("Aucune référence trouvée !", "Erreur", "info", "", "OK");
      ref.afterClosed().subscribe(res => {
        this.router.navigate(['/liste-souscription']);
      })
    }else{
      this.initSouscription(IDSOUSCRIPTIONS);
    }
  }

  initSouscription(IDSOUSCRIPTIONS: number){
    this.isLoading = true;
    this.amortissementService.getSouscription(IDSOUSCRIPTIONS).subscribe(res => {
      console.log(res)
      this.souscritpion = res[0];
      this.isLoading = false;

      this.setEcheance(this.IDSOUSCRIPTIONS);
    })
  }

  newVersement(){
    const ref = this.dialog.open(SouscriptionFormComponent);
    ref.componentInstance.IDSOUSCRIPTIONS = this.IDSOUSCRIPTIONS;
    ref.componentInstance.Immatriculation = this.souscritpion.Immatriculation;
  }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  setEcheance(IDSOUSCRIPTIONS: number){
    this.echeancesIsLoading = true;

    this.amortissementService.getEcheances(this.IDSOUSCRIPTIONS).subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.echeancesIsLoading = false;
      
    })
    
  }

  imprimer(){
    this.printLoading = true
    this.amortissementService.printSouscription(this.IDSOUSCRIPTIONS).subscribe((data)=>{
      console.log(data)
      var anchor = document.createElement("a");
      anchor.href = data.sEtat
       anchor.download = "Liste Des Echéances ";
       document.body.appendChild(anchor);
      //  anchor.click();
      let pdfWindow = window.open("", "_blank", "Liste Echéances");
      pdfWindow ? pdfWindow!.document.write(
        "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
          encodeURI(data.sEtat) +
          "'></iframe></body>"
      ): null;
      this.printLoading = false
    });
  }

}
