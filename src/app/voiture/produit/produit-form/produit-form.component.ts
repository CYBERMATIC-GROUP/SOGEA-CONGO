import { Component, Input } from '@angular/core';
import { ModeleAutomobileService } from '../../services/modele.automobile.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModeleAutomobile } from '../../models/modele.automobile.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';
import { Compte } from '../../models/compte.model';
import { CompteService } from '../../services/compte.service';
import { TypeAutomobile } from '../../models/type-automobile.models';
import { TypeAutomobileService } from '../../services/type-automobile.service';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Genre } from '../../models/genre.models';
import { GenreService } from '../../services/genre.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/voiture/models/category.model';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent {

  IDProduit!: string
  Reference!: string
  LibelleProduit!: string
  PrixVente!: string
  TauxTaxe!: string
  IDCOMPTE!: string
  CodeCompte!: string
  Validite!: string
  IDTypeAutomobile!: string
  IDGenre!: string
  TotalHT!: string
  IDTypeProduit!: string
  IND_CHAUF!: string
  Responsabilite_Civile!: string
  GESTION_POOL!: string
  Police!: string
  TimbreCarteRose!: string
  Commiss_Courtier_Jou!:string;
  TauxInteretAnnuel!:string;
  IDCategorie!: number
  selectedCompteId: string = '';

  isLoading!: boolean;

  compteList!:Compte[];
  suggestCompteList!: Compte[];
  categorieList!:Category[];
  genreList!:Genre[];
  produitList!:Produit[];
  typeAutomobileList!:TypeAutomobile[];

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private modelserice: ModeleAutomobileService,
    private router: Router,
    private produitService :ProduitService,
    private compteService:CompteService,
    private typeAutomobileService:TypeAutomobileService,
    public _location:Location,
    public globalService: GlobalService,
    public dialog:MatDialog,
    private genreService:GenreService,
    private toast:ToastrService,
    private categorie:CategoryService
  ) {}

  ngOnInit(): void {
    if (this.IDProduit) {
      this.initForUpdate(this.IDProduit);

    }

    this.loadcompte()
    this.categoriy()
    this.loadGenre()
    this.loadproduit()
    this.loadtypeAutomobile()
    console.log(this.IDProduit);
    console.log(this.action);
  }

  loadtypeAutomobile(){
    this.typeAutomobileService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);  
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.typeAutomobileList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  categoriy(){
    this.categorie.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);  
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.categorieList = data;
      console.log(this.categorieList)
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadGenre(){
    this.genreService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);  
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.genreList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
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


  loadcompte(){
    this.compteService.getList("0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.compteList = data;
      this.suggestCompteList = this.compteList;
    },
    (error) =>{
      console.log(error)  
    }
    )
  }

  // updateCodeCompte(event: any) {
  //   const selectedValue = event.target.value;
  //   const selectedCompte = this.compteList.find(compte => compte.LibelleCompte == selectedValue);
  //   console.log(selectedValue )
  //   console.log(selectedCompte);
  //   this.CodeCompte = selectedCompte ? selectedCompte.CodeCompte : '';
  //   // this.Reference = selectedCompte ? selectedCompte.LibelleCompte : '';
    
  // }
  

  selectCompte(compte: any) {
    this.IDCOMPTE = compte.IDCOMPTE;
  }

  addCompte(){

  }

  onInputCompte(event: any){
    const eltInput = event.target.value;
    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestCompteList = this.compteList.filter(elt => regex.test(elt.LibelleCompte));

    }else{
      
      this.suggestCompteList = this.suggestCompteList;

    }
  }

  updateCodeCompte(event: any) {

    const selectedValue = event.target.value;
    const selectedCompte = this.compteList.find(compte => compte.LibelleCompte === selectedValue);
  
    if (selectedCompte) {

      this.selectedCompteId = selectedCompte.IDCOMPTE;
      this.CodeCompte = selectedCompte.CodeCompte;

      console.log(this.selectedCompteId);
      console.log(this.CodeCompte);

    } else {
      this.selectedCompteId = '';
      this.CodeCompte = '';
    }
  }
  

  initForUpdate(ProduitID: string) {
    this.isLoading = true;
    this.produitService
      .getOne(ProduitID).subscribe((data) => {
         this.isLoading = false;
         console.log(data);
         this.IDProduit = data.IDProduit
         this.Reference = data.Reference
         this.LibelleProduit = data.LibelleProduit
         this.PrixVente =  data.PrixVente
         this.TauxTaxe =  data.TauxTaxe
         this.IDCOMPTE = data.IDCOMPTE
         this.CodeCompte = data.CodeCompte
         this.Validite = data.Validite
         this.Commiss_Courtier_Jou = data.Commiss_Courtier_Jou
         this.TauxInteretAnnuel = data.TauxInteretAnnuel  
         this.IDTypeAutomobile = data.IDTypeAutomobile
         this.IDGenre = data.IDGenre
         this.IDCategorie = data.IDCategorie
         this.TotalHT =  data.TotalHT
         this.IDTypeProduit = data.IDTypeProduit
         this.IND_CHAUF = data.IND_CHAUF
         this.Responsabilite_Civile =  data.Responsabilite_Civile
         this.GESTION_POOL = data.GESTION_POOL
         this.Police = data.Police
         this.TimbreCarteRose =  data.TimbreCarteRose
     
      });
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    const produit: Produit = form.value;

    produit.IDProduit=this.IDProduit;
    produit.IDCOMPTE = this.IDCOMPTE;
    produit.IDTypeProduit = "1";

    console.log(produit);

    if (this.action === 'edit') {
      this.produitService.update(produit).subscribe((data) => {
            console.log(data);
            const msg = "produit " + produit.LibelleProduit + " modifié !";
            this.dialog.closeAll();
            this.reloadPage();
            this.globalService.toastShow(msg, "Mise à jour");
            this.isLoading = false;
        });
    } else {
      this.produitService.create(produit).subscribe((data) => {
          console.log(produit)
          const msg = "produit " + produit.LibelleProduit + " ajouté!";
          this.dialog.closeAll();
          this.reloadPage();
          this.globalService.toastShow(msg, "Nouvel ajout");
          this.isLoading = false;
      });
    }
  }
  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/produit/list']);
    });
  }

}
