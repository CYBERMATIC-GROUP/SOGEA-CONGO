import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { Automobile } from '../../models/automobile.models';
import { AutomobileService } from '../../services/automobile.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/core/services/departement.service';
import { Departement } from 'src/app/core/models/departement.model';
import { MarqueAutomobileService } from '../../services/marque-automobile.service';
import { MarqueAutomobile } from '../../models/marqueAutomobile';
import { TypeAutomobileService } from '../../services/type-automobile.service';
import { TypeAutomobile } from '../../models/type-automobile.models';
import { SourceEnergie } from '../../models/source-energie';
import { SourceEnergieService } from '../../services/source-energie.service';
import { Genre } from '../../models/genre.models';
import { GenreService } from '../../services/genre.service';
import { ProprietaireService } from '../../services/proprietaire.service';
import { Proprietaire } from '../../models/proprietaire.model';
import { LesScoietes } from '../../models/les-societes.model';
import { SocieteService } from '../../services/societe.service';
import { LesSocieteService } from '../../services/les-societe.service';
import { auto } from '@popperjs/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { MarqueAutoFormComponent } from '../../marque-automobile/marque-auto-form/marque-auto-form.component';
import { TypeAutomobileFormComponent } from '../../type-automobile/type-automobile-form/type-automobile-form.component';
import { GenreFormComponent } from '../../genre/genre-form/genre-form.component';
import { CookieService } from 'ngx-cookie-service';
import { CategoryComponent } from '../../category/category.component';
import { CategoryFomComponent } from '../../category/category-fom/category-fom.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-automobile-form',
  templateUrl: './automobile-form.component.html',
  styleUrls: ['./automobile-form.component.scss']
})
export class AutomobileFormComponent implements OnInit{

  formMemorieName = "autoFormMemorie";

  action: "edit" | "view" | "create" = "create";
  isLoading!: boolean;
  autoForm!: FormGroup;
  autoFormPreview$!: Observable<Automobile>;
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
  IDAutomobiles!: number;

  constructor(
    private formBuilder: FormBuilder,
    private automobileService: AutomobileService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService,
    public _location: Location,
    private marqueAutomobileService: MarqueAutomobileService,
    private typeAutomobileService: TypeAutomobileService,
    private sourceEnergieService: SourceEnergieService,
    private genreService: GenreService,
    private proprietaireService: ProprietaireService,
    private lesSocieteService: LesSocieteService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private cookie: CookieService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.initFormBuilder();
    this.loadMarqueAutomobile();
    this.loadGenre();
    this.loadTypeAutomobile();
    this.loadProprietaires();
    this.loadSourceEnergies();
    this.loadCategory();
    this.loadDepartements();

    //Les societes
    this.loadLesSocietes();

    const IDAutomobiles = +this.route.snapshot.params['idAuto'];
    this.IDAutomobiles = IDAutomobiles;

    if(IDAutomobiles){
      this.initForViewOrUpdate(IDAutomobiles);
      const action = this.route.snapshot.params['action'];
      this.action = action; 
    }else{
      this.action = 'create';
    }

    this.initEventForLesSocietes();
  }

  initFormBuilder(){
    this.autoForm = this.formBuilder.group({
      IDAutomobiles: [null],
      NumeroSerie: [null, [Validators.required]],
      Immatriculation: [null, [Validators.required]],
      AnneeConstruction: [null, [Validators.required]],
      IDMarqueAutomobile: [null, [Validators.required]],
      Marque: [null, [Validators.required]],
      IDTypeAutomobile: [null, [Validators.required]],
      TypeAutomobile: [null, [Validators.required]],
      IDSourceEnergie: [null, [Validators.required]],
      IDGenre: [null],
      Genre: [null, [Validators.required]],
      IDProprietaire: [null],
      Proprietaire: [null],
      IDLesSocietes: [null],
      lesSocietesName: [null],
      IDDEPARTEMENT: [null,  [Validators.required]],
      nom: [null, [Validators.required]],
      Couleur: [null],
      Photo: [null],
      Status: [null],
      PuissanceMoteur: [null],
      DateDelivrance: [null],
      CodeCompte: [null],
      bTaxiMoto: [null],
      IDville: [null],
      IdentifiantCarte: [null],
      Etat: [null],
      IDCategorie: [null],
      Departement: [null]
    });

    const memories = this.cookie.get(this.formMemorieName);
    if(memories){
      const memoriesParse = JSON.parse(memories);
      this.autoForm.patchValue(memoriesParse);
    }

    this.autoFormPreview$ = this.autoForm.valueChanges;
    
  }

/**////////////////START ABOUT LES SOCIETES */

  /**must set after init formBuilder and initViewOrUpdate*/
  initEventForLesSocietes(){

    this.autoForm.get('lesSocietesName')?.valueChanges.subscribe((value) => {
      if (this.societeList.find(elt => elt.NomSociete == value) || (value == "")){

        this.autoForm.get('lesSocietesName')?.setErrors(null);

      }
      else{

        this.autoForm.get('lesSocietesName')?.setErrors(Validators.required);

      }
    });
  }

  onBlurLesSocietes(event: any){
    const lesSocietesName = event.target.value;
    if(lesSocietesName.length > 0){
      let societe = this.societeList.find(elt => elt.NomSociete == lesSocietesName);
      if (societe){
        this.autoForm.get('IDLesSocietes')?.setValue(societe.IDLesSocietes);
        console.log(this.autoForm.value.IDLesSocietes);
        
      }else{
        this.autoForm.get('IDLesSocietes')?.setValue('');
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

  addLesSocietes(){
    this.cookie.set(this.formMemorieName, JSON.stringify(this.autoForm.value), 0.0333)
    const newSocieteName = this.autoForm.value.lesSocietesName;
    this.router.navigate(['/voiture/les-societes/nouveau/' + newSocieteName]);
  }

  ////////////////END ABOUT LES SOCIETES//////////////////////////////////////////////////////

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
        this.autoForm.get('IDMarqueAutomobile')?.setValue(marque.IDMarqueAutomobile);
        console.log(this.autoForm.value.IDMarqueAutomobile);
        
      }else{
        //this.addMarque();
        /*const content = "La marque automobile du nom préci '" + marqueAutoName + "' n'a pas été trouvé dans le système! </br> Voulez-vous l'ajouter ? ";
        const ref = this.globalService.alert(content, "Alerte !", "info", "Non", "Oui");

        ref.afterClosed().subscribe(result => {
          if(result){
            this.addMarque(marqueAutoName);
          }else{
            this.autoForm.get('marqueAutoName')?.setValue("");
            this.autoForm.get('IDMarqueAutomobile')?.setValue("");
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

  addMarque(){
    const name = this.autoForm.value.marqueAutoName;
    const ref = this.dialog.open(MarqueAutoFormComponent);
    ref.componentInstance.Marque = name;
    ref.componentInstance.justCloseAfterSubmit = true;

    ref.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        this.marqueAutomobileService.getList().pipe(

          tap(marques => {
            this.marqueAutoList = marques;
            let typeFound = this.marqueAutoList.find(elt => elt.Marque == name);
            this.autoForm.get('marqueAutoName')?.setValue(typeFound?.Marque);
            this.autoForm.get('IDMarqueAutomobile')?.setValue(typeFound?.IDMarqueAutomobile);
            console.log(typeFound);
            this.isLoading = false;
          }),

          catchError((err, caught) => {
            console.log(err);
            console.log(caught);
            this.globalService.raiseErrorServer();
            this.isLoading = false;
            return EMPTY;
          })

        ).subscribe();
      }else{
        this.autoForm.get('marqueAutoName')?.setValue("");
        this.autoForm.get('IDMarqueAutomobile')?.setValue("");
      }
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
        this.autoForm.get('IDTypeAutomobile')?.setValue(type.IDTypeAutomobile);
        console.log(this.autoForm.value.IDTypeAutomobile);
        
      }else{
        //this.addType();
        /*const content = "Le type automobile du nom préci '" + typeVal + "' n'a pas été trouvé dans le système! </br> Voulez-vous l'ajouter ? ";
        const ref = this.globalService.alert(content, "Alerte !", "info", "Non", "Oui");

        ref.afterClosed().subscribe(result => {
          if(result){
            this.addType(typeVal);
          }else{
            this.autoForm.get('IDTypeAutomobile')?.setValue('');
            this.autoForm.get('typeAutomobileName')?.setValue('');
          }
        })*/
      }
    }
  }

  addType(){
    const type = this.autoForm.value.TypeAutomobile;
    
    const ref = this.dialog.open(TypeAutomobileFormComponent);
    ref.componentInstance.NomType = type;
    ref.componentInstance.justCloseAfterSubmit = true;

    ref.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        this.typeAutomobileService.getList().pipe(

          tap(types => {
            this.typeAutomobileList = types;
            let typeFound = this.typeAutomobileList.find(elt => elt.NomType == type)
            this.autoForm.get('IDTypeAutomobile')?.setValue(typeFound?.IDTypeAutomobile);
            this.autoForm.get('TypeAutomobile')?.setValue(typeFound?.NomType);
            console.log(typeFound);
            this.isLoading = false;
          }),

          catchError((err, caught) => {
            console.log(err);
            console.log(caught);
            this.globalService.raiseErrorServer();
            this.isLoading = false
            return EMPTY;
          })

        ).subscribe();
      }
      else{
        this.autoForm.get('IDTypeAutomobile')?.setValue('');
        this.autoForm.get('TypeAutomobile')?.setValue('');
      }
    })
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
        this.autoForm.get('IDGenre')?.setValue(type.IDGenre);
        console.log(this.autoForm.value.IDGenre);
        
      }else{
        //this.addGenre();
      }
    }
  }

  addGenre(){
    const name = this.autoForm.value.genreName;
    const ref = this.dialog.open(GenreFormComponent);
    ref.componentInstance.GenreVoiture = name;
    ref.componentInstance.justCloseAfterSubmit = true;

    ref.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        this.genreService.getList().pipe(

          tap(genres => {
            this.genreList = genres;
            let typeFound = this.genreList.find(elt => elt.GenreVoiture == name);
            this.autoForm.get('genreName')?.setValue(typeFound?.GenreVoiture);
            this.autoForm.get('IDGenre')?.setValue(typeFound?.IDGenre);
            console.log(typeFound);
            this.isLoading = false;
          }),

          catchError((err, caught) => {
            console.log(err);
            console.log(caught);
            this.globalService.raiseErrorServer();
            this.isLoading = false;
            return EMPTY;
          })

        ).subscribe();
      }else{
        this.autoForm.get('genreName')?.setValue("");
        this.autoForm.get('IDGenre')?.setValue("");
      }
    })
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
        this.autoForm.get('IDProprietaire')?.setValue(type.IDProprietaire);
        console.log(this.autoForm.value.IDProprietaire);
      }else{
        //this.addGenre();
      }
    }
  }

  onSelectProprietaire(proprio: Proprietaire){
    this.autoForm.get('IDProprietaire')?.setValue(proprio.IDProprietaire);
    console.log(this.autoForm.value.IDProprietaire);
  }

  addProprio(){
    this.cookie.set(this.formMemorieName, JSON.stringify(this.autoForm.value), 0.1332);
    const name = this.autoForm.value.proprioName;
    this.router.navigate(['voiture/proprietaire/ajout/'+ name]);
  }

//////////END  FOR PROPRIETAIRE//////////////////

  initForViewOrUpdate(IDAutomobiles: number){
    let automobile$!: Observable<Automobile>; 
    this.isLoading = true;

    automobile$ = this.automobileService.getOne(IDAutomobiles).pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.globalService.raiseErrorServer("Impossible de recuperer les données !");
        this.isLoading = false;
        return EMPTY;
      })
    );

    automobile$.subscribe(automobile => {
      console.log(automobile);
      console.log('debug')
      this.autoForm.patchValue(automobile);
      this.autoForm.value.IDDEPARTEMENT = 1;
      this.autoFormPreview$ = this.autoForm.valueChanges;
    });
  }

  onInputSourceEnergie(event: any){
    const eltInput = event.target.value;
    
    this.sourceEnergieList$.subscribe(liste => {
      if (eltInput.length > 0){

        const regex = new RegExp(eltInput + '.*', 'i');
        this.suggestSourceEnergie = liste.filter(elt => regex.test(elt.SourceEnergie));

      }else{
        this.suggestSourceEnergie = liste;
      }
    });

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

  onInputDepartement(event: any){
    const eltInput = event.target.value;
    if (eltInput.length > 0){

      const regex = new RegExp(eltInput + '.*', 'i');
      this.suggestDepartements = this.departements.filter(elt => regex.test(elt.NomDepartement));

    }else{
      this.suggestDepartements = this.departements
    }
  }

  /*loadTypeVehicules(){
    this.isLoading = true;
    let departements$!: Observable<Departement[]>;

    departements$ = this.departementService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        return EMPTY;
      })
    );

    departements$.subscribe(departements => {
      this.isLoading = false;
      this.departements = departements
    })
  }*/

  //////////// CATEGORY //
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

  addCategory() {
    const ref = this.dialog.open(CategoryFomComponent);
    const idCategory = this.autoForm.value.IDCategorie
    const categoryFound = this.categoryList.find(elt => elt.IDCategories);
    if(categoryFound){
      ref.componentInstance.Categorie_Vehicule = categoryFound.Categorie_Vehicule;
    }
  }
  /////////END CARTEGORY //////////////
  
  onFocusNom(){
    this.autoForm.get('nom')?.setValue(this.autoForm.value.Marque + "-" + this.autoForm.value.TypeAutomobile + "-");
  }

  submitAutomobile(){
    this.cookie.delete(this.formMemorieName);
    const automobile: Automobile = this.autoForm.value;
    console.log(automobile);

    if(this.action == "edit"){
      this.automobileService.update(automobile).pipe(
        tap(automobile => {
          console.log(automobile);
  
          this.cookie.delete(this.formMemorieName);
  
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/voiture/automobile/view/' + this.IDAutomobiles]);
          });

          this.toastr.success("Mise à jour effectuée !", "succes");
        
        }),
        catchError((err, caught) => {
          console.log(err);
          console.log(caught);
          this.globalService.raiseErrorServer();
          return EMPTY;
        })
      ).subscribe();
    }else{
      this.automobileService.create(automobile).pipe(
        tap(automobile => {
          console.log(automobile);
  
          this.cookie.delete(this.formMemorieName);
  
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/voiture/automobile']);
            this.toastr.success("Nouvel automobile ajouté !", "succes")
          });
        
        }),
        catchError((err, caught) => {
          console.log(err);
          console.log(caught);
          this.globalService.raiseErrorServer();
          return EMPTY;
        })
      ).subscribe();
    }
    
    /*this.isLoading = true;
    const societe: Societe = this.societeForm.value;
    console.log(societe);

    this.societeService.create(societe).pipe(
      tap(societe => {
        this.isLoading = false;
        console.log(societe);
        
        this.router.navigate(['/voiture/societe']);
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.globalService.raiseErrorServer();
        this.isLoading = false;
        return EMPTY;
      })
    ).subscribe();*/
    
  }

  delete(){
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.buttonCancelName = "Annuler";
    ref.componentInstance.buttonOKName = "OUI";
    ref.componentInstance.content = "Voulez-vous supprimer l'automobile  ?";
    ref.componentInstance.type = "danger";

    ref.afterClosed().subscribe(result => {
      
      if(result){
        console.log(this.IDAutomobiles);
        this.automobileService.delete(this.IDAutomobiles).pipe(
          tap(res => {
            console.log(res);
            
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/voiture/automobile']);
              this.toastr.success("Automobile  supprimé !");
            });
          }),
          catchError((err, caught) => {
            console.log(err);
            console.log(caught);
            this.globalService.raiseErrorServer();
            return EMPTY
          })
        ).subscribe();
      }
    })
  }

  edit(){
    this.action = "edit";
    this.toastr.info("Vous êtes passé en mode édition !", "Modification")
  }

}
