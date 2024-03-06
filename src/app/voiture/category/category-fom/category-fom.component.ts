import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, DialogCategorieData } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { EMPTY, catchError } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-fom',
  templateUrl: './category-fom.component.html',
  styleUrls: ['./category-fom.component.scss'],
})
export class CategoryFomComponent implements OnInit {
  paramIDCategory!: number;
  categorie!: Category;

  IDCategories!: number;
  CodeCategorie!: string;
  Categorie_Vehicule!: string;

  @Input() action !: "create" | "edit" | "view"
  justCloseAfterSubmit: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogCategorieData,
    public dialog: MatDialog,
    private router: Router,
    public _location:Location,
    private toast:ToastrService
 
  ) {}


  ngOnInit(): void {

 
    if (this.IDCategories) {
      this.initForUpdate(this.IDCategories)
   }
    console.log(this.IDCategories);
    console.log(this.action)

  }

  initForUpdate(CategoriesID: number) {
    this.categoryService.getOne(CategoriesID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

     this.IDCategories = data.IDCategories,
     this.CodeCategorie = data.CodeCategorie,
     this.Categorie_Vehicule = data.Categorie_Vehicule


    });
  }

  onSubmitForm(form: NgForm) {

    const categorie: Category = form.value;

    categorie.IDCategories = this.IDCategories

    if (this.action === 'edit') {
      this.categoryService
        .update(categorie)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "categorie " + categorie.Categorie_Vehicule + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.categoryService
        .create(categorie)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "category " + categorie.Categorie_Vehicule + " ajoutée !";
            this.toast.success(msg, "Ajout");
            this.dialog.closeAll();
            this.reloadPage();
           
          },
          (error) => console.log(error)
        );
    }
  }


  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/category']);
    });
  }

  // ngOnInit(): void {
  //  this.IDCategories = this.dialogData.categorie.IDCategories
  //  this.CodeCategorie = this.dialogData.categorie.CodeCategorie
  //  this.Categorie_Vehicule = this.dialogData.categorie.Categorie_Vehicule 
  // }

  // createCategory() {
  //   let payload:Category = {
  //     CodeCategorie: this.CodeCategorie,
  //     Categorie_Vehicule: this.Categorie_Vehicule,
  //     IDCategories: 0
  //   }
    
  //   this.categoryService
  //     .create(payload)
  //     .pipe(
  //       catchError((err, caught) => {
  //         console.log('err', err);
  //         console.log('caught', caught);
  //         return EMPTY;
  //       })
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.dialog.closeAll();
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/voiture/category']);
  //       });
  //     });
  // }

  // updateCategory() {
  //   let payload:Category = {
  //     CodeCategorie: this.CodeCategorie,
  //     Categorie_Vehicule: this.Categorie_Vehicule,
  //     IDCategories: this.IDCategories
  //   }
    
  //   this.categoryService
  //     .update(payload)
  //     .pipe(
  //       catchError((err, caught) => {
  //         console.log('err', err);
  //         console.log('caught', caught);
  //         return EMPTY;
  //       })
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.dialog.closeAll();
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/voiture/category']);
  //       });
  //     });
  // }
}
