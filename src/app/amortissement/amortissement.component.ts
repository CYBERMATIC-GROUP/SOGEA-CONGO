import { Component, OnInit, ViewChild } from '@angular/core';
import { AmortissementService } from '../services/amortissement.service';
import { Roots, XecheancierMensuel } from '../models/amortissement.model';
import { Observable } from 'rxjs';
import { GlobalService } from '../core/services/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { ProduitService } from '../voiture/services/produit.service';
import { Produit } from '../voiture/models/produit.model';
import { MatDialog } from '@angular/material/dialog';
import { AutomobileComponent } from '../voiture/automobile/automobile.component';
import { Automobile } from '../voiture/models/automobile.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-amortissement',
  templateUrl: './amortissement.component.html',
  styleUrls: ['./amortissement.component.scss']
})
export class AmortissementComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  message!: string;
  showButton!: boolean;
  amortissementDetails$!: Observable<Roots>;
  isLoading!: boolean;
  dataSource!: any;
  displayedColumns: string[] = [
    'NumeroEcheance',
    'DateEcheance',
    'SoldeInitial',
    'Mensualites',
    'MontantInteretsMensuel',
    'MontantCapitalMensuel',
    'ResteDu',
    'MontantInteretsCumules',
  ];
  DateEcheanceConvert!: string;
  DateEcheance!: string;
  selectedProduit!: string;
  produitList!: Produit[];
  autoSelected!: Automobile;
  buttonPrint!: boolean;
  versement!: string;
  revenu_net!: string;

  constructor(
    private amotissementService: AmortissementService,
    public globalService: GlobalService,
    public _location: Location,
   private produitService: ProduitService,
     private dialog: MatDialog,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
     this.initProduits();
  }

  initAmortissement(idProduit: string, DateDebutEcheance: string, idVehicule: string){
    console.log(idProduit, DateDebutEcheance, idVehicule);
    this.isLoading = true;
    this.amortissementDetails$ = this.amotissementService.getByProduitAndDate(idProduit, DateDebutEcheance, 0, idVehicule);

    this.amortissementDetails$.subscribe(data => {
      this.buttonPrint = true;
      console.log(data);
      this.setDataTableEcheance(data.XECHEANCIER_MENSUEL);
      this.isLoading = false;
    })
  }

  convertToValideDates(DateEcheance: string){
    const year = DateEcheance.split('-')[0];
    const month  = DateEcheance.split('-')[1];
    const day = DateEcheance.split('-')[2];
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  setDataTableEcheance(data: XecheancierMensuel[]){
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
  }

  onDateSelected(){
    this.DateEcheanceConvert = this.convertToValideDates(this.DateEcheance);
    if(this.autoSelected){
      this.initAmortissement(this.autoSelected.IDProduit.toString(), this.DateEcheanceConvert, this.autoSelected.IDAutomobiles.toString());
    }
  }

  initProduits(){
    this.isLoading = true;
    /*this.produitService.getList().subscribe(data => {
      this.produitList = data
      console.log(data);
      this.isLoading = false;
      
    })*/
  }

  imprimer(){
    this.isLoading = true
    this.message= "Patientez un instant, l'impression de votre fichier Pdf est en cours";
    this.amotissementService.getByProduitAndDate(this.autoSelected.IDProduit.toString(), this.DateEcheance, 1,this.autoSelected.IDAutomobiles.toString() ).subscribe((data)=>{
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
      this.isLoading = false
      this.message= "chargement de la liste"
    });
  }

  selectProduit(){
    if(this.DateEcheanceConvert && this.autoSelected){
      this.initAmortissement(this.selectedProduit, this.DateEcheanceConvert, this.autoSelected.IDAutomobiles.toString());
    }else{
      this.globalService.alert("Veuillez d'abord selectionner la date debut et le véhicule", "Attention", "info", "", "OK");
    }
  }

  onSelectCar(){
      const ref = this.dialog.open(AutomobileComponent);
      ref.componentInstance.isOpenForArmotissement = true;
      ref.afterClosed().subscribe(res => {
        console.log(ref.componentInstance.autoSelected);
        const auto = ref.componentInstance.autoSelected;
        this.autoSelected = auto;

        if(this.DateEcheanceConvert){
          this.initAmortissement(this.autoSelected.IDProduit.toString(), this.DateEcheanceConvert, this.autoSelected.IDAutomobiles.toString());
        }
      })
  }

  valideContrat(){
    this.amotissementService.validContrat(this.autoSelected.IDProduit, this.DateEcheanceConvert, "1", this.autoSelected.IDAutomobiles, Number(this.revenu_net), 0).subscribe(res => {
      this.globalService.toastShow("Nouvelle suscription réussie", "Nouveau contrat");
    })
  }
}
