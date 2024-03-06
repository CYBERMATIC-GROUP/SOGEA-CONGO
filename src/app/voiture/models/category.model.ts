export class Category{
    IDCategories!: number; 
    CodeCategorie!: string; 
    Categorie_Vehicule!: string; 
}

export class DialogCategorieData {
    categorie!: Category;
    action!: 'create' | 'update';
  }