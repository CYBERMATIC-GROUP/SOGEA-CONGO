import { Component, ViewChild } from '@angular/core';
import { MarqueAutomobile } from '../models/marqueAutomobile';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MarqueAutomobileService } from '../services/marque-automobile.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { Location } from '@angular/common';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';
import { CalculEcheanceService } from '../services/calcul-echeance.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DateServiceService } from '../services/date-service.service';
import { CalculEcheance } from '../models/calculEcheance.model';


@Component({
  selector: 'app-calcul-echeance',
  templateUrl: './calcul-echeance.component.html',
  styleUrls: ['./calcul-echeance.component.scss']
})
export class CalculEcheanceComponent {

  
  dataSource!: any;
  displayedColumns: string[] = ['Liibelle','DateEcheance','sMontant','sResteAPayer'];
  produitSelected!: Produit;
  produitList!: Produit[];
  Liibelle!: string;
  calculList$!: Observable<CalculEcheance[]>;
  produitList$!: Observable<Produit[]>;
  isLoading!: boolean;
  Montant!: string;
  ResteAPayer!: number;
  prixvente: any;
  validite!: string;
  moMontant!: string;
  DateEcheance!: string;
  selectedProduit!: string;
  CodeCompte!:number
  sprixvente: string = "";
  svalidite: string = "";
  IDproduit!:  string;
  message!: string;
  showButton = false; 

  constructor(
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private produitService: ProduitService,
    private calculEcheanceService: CalculEcheanceService,
    private dateService:DateServiceService
  ) {}

  selectProduit() {

  
    if (this.selectedProduit) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  
    const produitSelectionne = this.produitList.find(produit => produit.CodeCompte === this.selectedProduit);
    console.log(produitSelectionne);

    if (produitSelectionne) {
      this.sprixvente = produitSelectionne.PrixVente;
      this.svalidite = produitSelectionne.Validite;
      this.IDproduit = produitSelectionne.IDProduit;
    } else {
      this.sprixvente = '';
      this.svalidite = '';
      this.IDproduit = '';
    }
    
  
    console.log(this.sprixvente);
    console.log(this.svalidite);
    console.log(this.IDproduit);
 
    this.getAllcalcul();
  }
  
  

  onDateSelected() {
    console.log(this.DateEcheance);
    this.getAllcalcul();
  } 

  

  ngOnInit(): void {
    this.getAllproduit();
    this.loadproduit();
   
  }


  getAllcalcul() {
    console.log( this.sprixvente)
    console.log( this.svalidite)
    console.log(this.DateEcheance);

    if (!this.sprixvente || !this.validite || !this.DateEcheance) { 
      console.log('Les paramètres sont vides');
      return;
    }
  
    this.isLoading = true;
    this.calculList$ = this.calculEcheanceService.getListe(this.sprixvente,this.svalidite, this.convertToValideDates(this.DateEcheance)).pipe(
      
      catchError((err, caught) => {
        console.log()
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();
        this.isLoading = false;
        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );
  
    this.calculList$.subscribe((calculList) => {
      console.log(calculList);
      console.log(this.sprixvente,this.svalidite, this.convertToValideDates(this.DateEcheance))
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(calculList);
      this.dataSource.paginator = this.paginator;
    });
  }


  convertToValideDate(DateEcheance: string){
    const year = DateEcheance.split('-')[0];
    const month  = DateEcheance.split('-')[1];
    const day = DateEcheance.split('-')[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  convertToValideDates(DateEcheance: string){
    const year = DateEcheance.split('-')[0];
    const month  = DateEcheance.split('-')[1];
    const day = DateEcheance.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  loadproduit(){
    this.produitService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.produitList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllproduit() {
    this.isLoading = true;
    this.produitList$ = this.produitService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();
        this.isLoading = false;
        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );


    this.produitList$.subscribe((produitList) => {
      console.log(produitList);

      this.moMontant = produitList["0"].PrixVente
      this.validite = produitList["0"].Validite
    });
  }


  onClickLine(produit: Produit) {
    console.log('clicque : ' + produit.IDCOMPTE);
    this.produitSelected = produit;
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  Imprimer(){
    this.isLoading = true
    this.message= "Patientez un instant, l'impression de votre fichier Pdf est en cours"
    this.calculEcheanceService.impression(this.IDproduit,this.convertToValideDates(this.DateEcheance)).subscribe((data)=>{
      console.log(data)
      var anchor = document.createElement("a");
      anchor.href = data.message;
       anchor.download = "Liste Des Echéances ";
       document.body.appendChild(anchor);
      //  anchor.click();
      let pdfWindow = window.open("", "_blank", "Liste Echéances");
      pdfWindow ? pdfWindow!.document.write(
        "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
          encodeURI(data.message) +
          "'></iframe></body>"
      ): null;
      this.isLoading = false
      this.message= "chargement de la liste"
    });
}

}
