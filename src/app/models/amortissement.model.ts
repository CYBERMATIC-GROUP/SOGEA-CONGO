export interface Roots {
  XECHEANCIER_ANNUEL: XecheancierAnnuel[]
  XECHEANCIER_MENSUEL: XecheancierMensuel[]
  ParametreGeneral: ParametreGeneral
  sEtat: string
}

export interface XecheancierAnnuel {
  DateDebutEcheance: string
  DateFinEcheance: string
  CapitalPlusInteret: number
  MontantDuPret: number
  TauxInteretAnnuel: number
  NbreMensualiteParAn: number
  MontantInteretsMensuel: number
  MontantCapitalMensuel: number
  ResteDu: number
  PrimeRisque: number
  MontantInteretsCumules: number
  TotalGeneralRembourse: number
  NumeroEcheance: number
  Mensualites: number
}

export interface XecheancierMensuel {
  DateEcheance: string
  SoldeInitial: number
  Mensualites: number
  MontantInteretsMensuel: number
  MontantCapitalMensuel: number
  ResteDu: number
  MontantInteretsCumules: number
  NumeroEcheance: number
}

export interface ParametreGeneral {
  DateDebutEcheance: string
  DateFinEcheance: string
  CapitalPlusInteret: number
  MontantDuPret: number
  TauxInteretAnnuel: number
  NbreMensualiteParAn: number
  MontantInteretsMensuel: number
  MontantCapitalMensuel: number
  ResteDu: number
  PrimeRisque: number
  MontantInteretsCumules: number
  TotalGeneralRembourse: number
  NumeroEcheance: number
}

export interface EcheanceSolde {
  Numero: number
  MontantPret: number
  SoldeInitial: number
  Mensualite: number
  Versement: number
  Interet: number
  CapitalRembourse: number
  Commiss_Courtier: number
  bSolde: number
  IDSOUSCRIPTIONS: number
  IDProduit: number
  Annee: number
  IDAutomobiles: number
  IDProprietaire: number
}