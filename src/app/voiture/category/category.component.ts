import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../services/category.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Category, DialogCategorieData } from '../models/category.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFomComponent } from './category-fom/category-fom.component';
import { Location } from '@angular/common';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = [ 'Categorie_Vehicule','CodeCategorie', 'Actions'];
  dataSource!: any;
  categoryList$!: Observable<Category[]>;

  isLoading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private globaService: GlobalService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.isLoading = true;
    this.categoryList$ = this.categoryService.getList().pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        this.isLoading = false;
        const ref = this.globaService.raiseErrorServer();

        ref.afterClosed().subscribe((result) => {
          this.router.navigate(['/']);
        });
        return EMPTY;
      })
    );

    this.categoryList$.subscribe((categoryList) => {
      console.log(categoryList);

      this.dataSource = new MatTableDataSource(categoryList);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }


  openEditCategory(categorie: Category) {
   
    let dialogData: DialogCategorieData = {
      categorie: categorie,
      action: 'update',
    };
    this.dialog.open(CategoryFomComponent, {
      data: dialogData
    });
  }

  openAddCategoryModal() {
    let categorie!: Category;
    let dialogData: DialogCategorieData = {
      categorie: categorie,
      action: 'create',
    };

    this.dialog.open(CategoryFomComponent, {
      data: dialogData,
    });

  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(categorie: Category) {
    const dialog = this.dialog.open(CategoryFomComponent, {});

    dialog.componentInstance.action = 'edit';
    dialog.componentInstance.IDCategories = categorie.IDCategories;
  }

  create() {
    const dialog = this.dialog.open(CategoryFomComponent, {

      maxWidth :"500px"
    });

    dialog.componentInstance.action = 'create';
   
  }

  view(categorie: Category) {
    const refview = this.dialog.open(CategoryFomComponent, {});
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDCategories = categorie.IDCategories;
  }

  delete(Category:Category){

    const msg = "Voulez-vous retirer la categorie " + Category.Categorie_Vehicule + " ?";
    const ref = this.globaService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    ref.afterClosed().subscribe(res => {
      if(res){
        this.categoryService.delete(Category.IDCategories).subscribe(data => {
          this.toast.success("category " + Category.Categorie_Vehicule + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/category']);
    });
  }

}
