export class Departement {
  IDDEPARTEMENT!: number;
  CodeDepartement!: string;
  NomDepartement!: string;
  Ordre!: string;
}

export class DialogDepartementData {
  departement!: Departement;
  action!: 'create' | 'update';
}