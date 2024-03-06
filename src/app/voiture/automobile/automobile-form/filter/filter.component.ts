import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Departement } from 'src/app/core/models/departement.model';
import { DepartementService } from 'src/app/core/services/departement.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Automobile } from 'src/app/voiture/models/automobile.models';
import { Category } from 'src/app/voiture/models/category.model';
import { Genre } from 'src/app/voiture/models/genre.models';
import { LesScoietes } from 'src/app/voiture/models/les-societes.model';
import { MarqueAutomobile } from 'src/app/voiture/models/marqueAutomobile';
import { Proprietaire } from 'src/app/voiture/models/proprietaire.model';
import { SourceEnergie } from 'src/app/voiture/models/source-energie';
import { TypeAutomobile } from 'src/app/voiture/models/type-automobile.models';
import { CategoryService } from 'src/app/voiture/services/category.service';
import { GenreService } from 'src/app/voiture/services/genre.service';
import { LesSocieteService } from 'src/app/voiture/services/les-societe.service';
import { MarqueAutomobileService } from 'src/app/voiture/services/marque-automobile.service';
import { ProprietaireService } from 'src/app/voiture/services/proprietaire.service';
import { SourceEnergieService } from 'src/app/voiture/services/source-energie.service';
import { TypeAutomobileService } from 'src/app/voiture/services/type-automobile.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  filterForm!: FormGroup;
  filterFormPreview$!: Observable<Automobile>;
  departements!: Departement[];
  suggestDepartements!: Departement[];
  marqueAutoList!: MarqueAutomobile[];
  suggestMarqueAutoList!: MarqueAutomobile[];
  typeAutomobileList!: TypeAutomobile[];
  suggestTypeAutoMobile!: TypeAutomobile[];
  sourceEnergieList$!: Observable<SourceEnergie[]>;
  suggestSourceEnergie!: SourceEnergie[];
  genreList!: Genre[];
  suggestGenreList!: Genre[];
  proprietaireList!: Proprietaire[];
  suggestProprietaireList!: Proprietaire[];
  societeList!: LesScoietes[];
  suggestSocieteList!: LesScoietes[];
  categoryList!: Category[];
  isLoading!: boolean;

  resultFiltre!: any;

  constructor(
    private formBuilder: FormBuilder,
    private lesSocieteService: LesSocieteService,
    private globalService: GlobalService,
    private marqueAutomobileService: MarqueAutomobileService,
    private typeAutomobileService: TypeAutomobileService,
    private genreService: GenreService,
    private proprietaireService: ProprietaireService, 
    private sourceEnergieService: SourceEnergieService,
    private departementService: DepartementService,
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.loadMarqueAutomobile();
    this.loadGenre();
    this.loadTypeAutomobile();
    this.loadProprietaires();
    this.loadSourceEnergies();
    this.loadCategory();
    this.loadDepartements();
    this.loadLesSocietes();

    this.initForm();
  }

  onSubmitForm(){
    const NumeroSerie = this.filterForm.value.NumeroSerie ?? 0;
    const Immatriculation = this.filterForm.value.Immatriculation ?? "";
    const AnneeConstruction = this.filterForm.value.AnneeConstruction ?? 0;
    const IDMarqueAutomobile = this.filterForm.value.IDMarqueAutomobile ?? 0;
    const IDTypeAutomobile = this.filterForm.value.IDTypeAutomobile ?? 0;
    const IDSourceEnergie = this.filterForm.value.IDSourceEnergie ?? 0;
    const IDGenre = this.filterForm.value.IDGenre ?? 0;
    const IDLesSocietes = this.filterForm.value.IDLesSocietes ?? 0;
    const IDDEPARTEMENT = this.filterForm.value.IDDEPARTEMENT ?? 0;
    const IDTypeVehicule = this.filterForm.value.IDTypeVehicule ?? 0;
     
    this.resultFiltre = {
      Immatriculation: Immatriculation,
      AnneeConstruction: AnneeConstruction,
      IDTypeAutomobile: IDTypeAutomobile,
      NumeroSerie: NumeroSerie,
      IDMarqueAutomobile: IDMarqueAutomobile,
      IDSourceEnergie: IDSourceEnergie,
      IDGenre: IDGenre,
      IDLesSocietes: IDLesSocietes,
      IDDEPARTEMENT: IDDEPARTEMENT,
      IDTypeVehicule: IDTypeVehicule
    }
    console.log(Immatriculation, AnneeConstruction, IDTypeAutomobile)
  }

  initForm(){
    this.filterForm = this.formBuilder.group({
      IDAutomobiles: [null],
      NumeroSerie: [null],
      Immatriculation: [null],
      AnneeConstruction: [null],
      IDMarqueAutomobile: [null],
      IDTypeAutomobile: [null],
      IDGenre: [null],
      IDProprietaire: [null],
      Photo: [null],
      IDLesSocietes: [null],
      DateDelivrance: [null],
      IDCategories: [null],
      IDSourceEnergie: [null],
      MarqueAutomobile: [null],
      Marque: [null],
      TypeAutomobile: [null],
      Genre: [null],
      Proprietaire: [null],
      TypeVehicule: [null],
      Categories: [null],
      SourceEnergie: [null],
      lesSocietesName: [null],
      IDDEPARTEMENT: [null],
    })

    this.filterFormPreview$ = this.filterForm.valueChanges;
  }

  loadCategory(){
    this.categoryService.getList().pipe(
      tap(liste => {
        this.categoryList = liste;
        console.log(liste);
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.globalService.raiseErrorServer("Erreur de récupération des différentes categories");
        return EMPTY;
      })
    ).subscribe();
  }

  loadDepartements(){
    this.isLoading = true;
    let departements$!: Observable<Departement[]>;

    departements$ = this.departementService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Erreur de récupération des départements !");
        return EMPTY;
      })
    );

    departements$.subscribe(departements => {
      console.log(departements);
      
      this.isLoading = false;
      this.departements = departements
    })
  }



  loadSourceEnergies(){
    this.isLoading = true;
    this.sourceEnergieList$ = this.sourceEnergieService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Erreur de récupération des sources-energies !")
        return EMPTY;
      })
    );

    this.sourceEnergieList$.subscribe(data => {
      this.suggestSourceEnergie = data;
      console.log(data);
    })
  }

/**////////////////START ABOUT LES SOCIETES */

  /**must set after init formBuilder and initViewOrUpdate*/
  initEventForLesSocietes(){

    this.filterForm.get('lesSocietesName')?.valueChanges.subscribe((value) => {
      if (this.societeList.find(elt => elt.NomSociete == value) || (value == "")){

        this.filterForm.get('lesSocietesName')?.setErrors(null);

      }
      else{

        this.filterForm.get('lesSocietesName')?.setErrors(Validators.required);

      }
    });
  }

  onBlurLesSocietes(event: any){
    const lesSocietesName = event.target.value;
    if(lesSocietesName.length > 0){
      let societe = this.societeList.find(elt => elt.NomSociete == lesSocietesName);
      if (societe){
        this.filterForm.get('IDLesSocietes')?.setValue(societe.IDLesSocietes);
        console.log(this.filterForm.value.IDLesSocietes);
        
      }else{
        this.filterForm.get('IDLesSocietes')?.setValue('');
      }
    }
  }

  loadLesSocietes(){
    this.isLoading = true;
    let societeList$: Observable<LesScoietes[]> = this.lesSocieteService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Impossible de récupérer de la liste des sociétés disponibles!")
        return EMPTY;
      })
    );
    societeList$.subscribe(data => {
      this.societeList = data;
      this.suggestSocieteList = data;
      console.log(data);
      
    })
  }

  onInputSociete(event: any){
    
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestSocieteList = this.societeList.filter(elt => regex.test(elt.NomSociete));

    }else{

      this.suggestSocieteList = this.societeList;

    }
  }



  ///START ABOUT MARQUE ////////////////
  onInputMarqueAuto(event: any){
    const eltInput = event.target.value;
    
    if (eltInput.length > 0){

      const regexQuertier = new RegExp(eltInput + '.*', 'i');
      this.suggestMarqueAutoList = this.marqueAutoList.filter(elt => regexQuertier.test(elt.Marque));

    }else{
      this.suggestMarqueAutoList = this.marqueAutoList;
    }
  }
  
  onBlurMarqueAuto(event: any){
    const marqueAutoName = event.target.value;

    if(marqueAutoName.length > 0){
      let marque = this.marqueAutoList.find(elt => elt.Marque == marqueAutoName);
      if (marque){
        this.filterForm.get('IDMarqueAutomobile')?.setValue(marque.IDMarqueAutomobile);
        console.log(this.filterForm.value.IDMarqueAutomobile);
        
      }else{
        //this.addMarque();
        /*const content = "La marque automobile du nom préci '" + marqueAutoName + "' n'a pas été trouvé dans le système! </br> Voulez-vous l'ajouter ? ";
        const ref = this.globalService.alert(content, "Alerte !", "info", "Non", "Oui");

        ref.afterClosed().subscribe(result => {
          if(result){
            this.addMarque(marqueAutoName);
          }else{
            this.filterForm.get('marqueAutoName')?.setValue("");
            this.filterForm.get('IDMarqueAutomobile')?.setValue("");
          }
        })*/
      }
    }
  }

  loadMarqueAutomobile(){
    this.isLoading = true;
    const marqueAutoList$: Observable<MarqueAutomobile[]> = this.marqueAutomobileService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Erreur de récupération de la liste des marques automobile!")
        return EMPTY;
      })
    );

    marqueAutoList$.subscribe(data => {
      this.suggestMarqueAutoList = data;
      this.marqueAutoList = data;
      console.log(data);
      
    })
  }

//////END OF MARQUE /////////////////////

//////START TYPE AUTOMOBILE ///////////////////////////
onInputTypeAuto(event: any){
  const eltInput = event.target.value;

  if (eltInput.length > 0){

    const regex = new RegExp(eltInput + '.*', 'i');
    this.suggestTypeAutoMobile = this.typeAutomobileList.filter(elt => regex.test(elt.NomType));

  }else{
    this.suggestTypeAutoMobile = this.typeAutomobileList;
  }

}

loadTypeAutomobile(){
  this.isLoading = true;
  const typeAutomobileList$: Observable<TypeAutomobile[]> = this.typeAutomobileService.getList().pipe(
    catchError((err, caught) => {
      console.log(err);
      console.log(caught);
      this.isLoading = false;
      this.globalService.raiseErrorServer("Erreur de récupération de la liste des types de véhicules!")
      return EMPTY;
    })
  );

  typeAutomobileList$.subscribe(data => {
    this.suggestTypeAutoMobile = data;
    this.typeAutomobileList = data;
    console.log(data);
  })
}

onBlurTypeAuto(event: any){
  const typeVal = event.target.value;

  if(typeVal.length > 0){
    let type = this.typeAutomobileList.find(elt => elt.NomType == typeVal);
    if (type){
      this.filterForm.get('IDTypeAutomobile')?.setValue(type.IDTypeAutomobile);
      console.log(this.filterForm.value.IDTypeAutomobile);
      
    }else{
      //this.addType();
      /*const content = "Le type automobile du nom préci '" + typeVal + "' n'a pas été trouvé dans le système! </br> Voulez-vous l'ajouter ? ";
      const ref = this.globalService.alert(content, "Alerte !", "info", "Non", "Oui");

      ref.afterClosed().subscribe(result => {
        if(result){
          this.addType(typeVal);
        }else{
          this.filterForm.get('IDTypeAutomobile')?.setValue('');
          this.filterForm.get('typeAutomobileName')?.setValue('');
        }
      })*/
    }
  }
}
///////////END TYPE AUTOMOBILE/////////////////////////

  ///////////START GENRE ///////////////////////////
  onInputGenre(event: any){
    const eltInput = event.target.value;

    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestGenreList = this.genreList.filter(elt => regex.test(elt.GenreVoiture));

    }else{
      this.suggestGenreList = this.genreList;
    }

  }

  loadGenre(){
    this.isLoading = true;
    const genreList$: Observable<Genre[]> = this.genreService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Erreur de récupération de la liste des genres de véhicules!")
        return EMPTY;
      })
    );

    genreList$.subscribe(data => {
      this.suggestGenreList = data;
      this.genreList = data;
      console.log(data);
    })
  }

  onBlurGenre(event: any){
    const typeVal = event.target.value;

    if(typeVal.length > 0){
      let type = this.genreList.find(elt => elt.GenreVoiture == typeVal);
      if (type){
        this.filterForm.get('IDGenre')?.setValue(type.IDGenre);
        console.log(this.filterForm.value.IDGenre);
        
      }else{
        //this.addGenre();
      }
    }
  }
   ////////////END GENRE//////////////////////////////

  ////////START FOR PROPRIETAIRE////////////////////
  loadProprietaires(){
    this.isLoading = true;
    let proprietaireList$: Observable<Proprietaire[]> = this.proprietaireService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        this.globalService.raiseErrorServer("Erreur de récupération de la liste des propriétaires !")
        return EMPTY;
      })
    );
    proprietaireList$.subscribe(data => {
      this.suggestProprietaireList = data;
      this.proprietaireList = data;
      console.log(data);
    })
  }

  onInputProprietaire(event: any){
    const eltInput = event.target.value;
    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestProprietaireList = this.proprietaireList.filter(elt => regex.test(elt.Nom));

    }else{
      this.suggestProprietaireList = this.proprietaireList
    }
  }

  onBlurProprietaire(event: any){
    const typeVal = event.target.value;

    if(typeVal.length > 0){
      let type = this.proprietaireList.find(elt => elt.Nom + elt.Prenom == typeVal);
      if (type){
        this.filterForm.get('IDProprietaire')?.setValue(type.IDProprietaire);
      }else{
        //this.addGenre();
      }
    }
  }

//////////END  FOR PROPRIETAIRE//////////////////
}
