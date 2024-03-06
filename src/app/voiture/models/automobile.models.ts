export class Automobile {
  IDAutomobiles!: number
  nom!: string
  NumeroSerie!: string
  Immatriculation!: string
  AnneeConstruction!: number
  IDMarqueAutomobile!: number
  IDTypeAutomobile!: number
  IDGenre!: number
  IDProprietaire!: number
  Couleur!: string
  Photo!: string
  IDLesSocietes!: number
  Status!: number
  PuissanceMoteur!: string
  DateDelivrance!: string
  IDTypeVehicule!: number
  IDCategorie!: number
  IDSourceEnergie!: number
  CodeCompte!: string
  bTaxiMoto!: boolean
  IDville!: number
  Etat!: number
  IdentifiantCarte!: string
  IDDEPARTEMENT!: number
  DateCreation!: string
  DateModification!: string
  Departement!: string
  MarqueAutomobile!: string
  Marque!: string
  TypeAutomobile!: string
  Genre!: string
  Proprietaire!: string
  P_Nom!: string
  P_Prenom!: string
  TypeVehicule!: string
  Categories!: string
  SourceEnergie!: string
  IDProduit!: number
}


export interface filterAuto {
  IDAutomobiles?: number
  NumeroSerie?: number 
  Immatriculation?: string 
  AnneeConstruction?: string 
  IDMarqueAutomobile?: number 
  IDTypeAutomobile?: number 
  IDTypeVehicule?: number 
  IDSourceEnergie?: number
  IDGenre?: number 
  IDProprietaire?: number 
  IDLesSocietes?: number 
  IDDEPARTEMENT?: number 
  Etat?: string 
  Statu?: string 
}