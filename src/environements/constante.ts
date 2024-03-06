export default class SogeaConstantes {
  // type personne
  static CST_TYPE_PERSONNE_AGENCE: '1';
  static CST_TYPE_PERSONNE_TAXI: '2';
  static CST_TYPE_PERSONNE_ASSUREUR: '3';
  static CST_TYPE_PERSONNE_PRODUIT: '4';

  // sens DC
  static CST_SENS_DC_Credit = '1';
  static CST_SENS_DC_Debit = '2';
  static CST_SENS_DC_Indetermine = '3';
}

export const routesConstantes = {
  espaceProprietaire: {
    baseRoute: 'espace-proprietaire',
    connexion: 'connexion',
    tableauDeBord: 'tableau-de-bord',
    selectionSousription: 'mes-souscriptions',
    mesVehicule: 'mes-vehicules',
    detailsSouscription: 'details-souscription'
  },
  stationService: {
    baseRoute: 'station-service',
    connexion: 'connexion',
    tableauDeBord: 'tableau-de-bord',
    pointsVente: 'points-de-vente'
  }
}
export const AuthStorage = {
  proprietaire: {
    proprietaire: 'proprietaire'
  },
  admin: {
    agent: 'agent',
  },
  station: {
    station: 'station'
  }
}