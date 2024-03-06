import { Component} from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';
import { EMPTY, Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Agent } from '../models/agent.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitComponent {
  produitList$!: Observable<Produit[]>;

  dataSource!: any;
  displayedColumns: string[] = [
    'LibelleProduit',
    'PrixVente',
    'Reference',
    'Actions',
  ];

  isLoading!: boolean;
  paginator: any;

  sessionAgent!:Agent
action: any;

  constructor(
    public globaService: GlobalService,
    private router: Router,
    public dialog: MatDialog,
    public _location: Location,
    private produitService: ProduitService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllproduit();

    const agent = localStorage.getItem('agent');
    console.log(agent);
    if (agent) {
      this.sessionAgent = JSON.parse(agent);
      console.log(this.sessionAgent);
    }
  }

  getAllproduit() {
    this.isLoading = true
    this.produitList$ = this.produitService.getList().pipe(
      catchError((err, caught) => {
        console.log('err : ', err);
        console.log('caught : ', caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();
        this.isLoading = false;
        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );

    this.produitList$.subscribe((produitList$) => {
      console.log(produitList$);
      this.isLoading = false
      this.dataSource = new MatTableDataSource(produitList$);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }


  formatageMontant(PrixVente:number){
    return new Intl.NumberFormat().format(PrixVente) + ",00 XAF"
  }

  create() {
    const dialog = this.dialog.open(ProduitFormComponent, {
    });

    dialog.componentInstance.action = 'create';
   
  }


  // formatPrix  (prix : number, separateur: string = '  ', device: string = 'XAF') {
   
  //   let  reverse : string[] = prix.toString().split('').reverse();
  //   let prixFormated:string = '';
    
  //   for ( let i:number = 1 ; i <= reverse.length; i++ ) {
  //      prixFormated += reverse[i-1];
       
  //      if (i%3 === 0) {
  //        prixFormated += separateur;
  //      }
  //   }
    
  //   let formated = prixFormated.split('').reverse().join('')
  //   let decimal =  ',00 ' + device
    
  //   if ( formated[0] == separateur) {
  //     formated = formated.substring(1)
  //   }
 
  //   console.log(formated + decimal)
  //   return formated + decimal;
    
  //  }

  edit(produit: Produit) {
    const dialog = this.dialog.open(ProduitFormComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDProduit = produit.IDProduit;
  }

  view(produit: Produit) {
    const refview = this.dialog.open(ProduitFormComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDProduit = produit.IDProduit;
  }

  delete(produit:Produit){

    const msg = "Voulez-vous retirer le produit " + produit.LibelleProduit + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.produitService.delete(produit.IDProduit).subscribe(data => {
          this.toast.success("produit " + produit.IDProduit + " supprimé avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/produit/list']);
    });
  }
}
