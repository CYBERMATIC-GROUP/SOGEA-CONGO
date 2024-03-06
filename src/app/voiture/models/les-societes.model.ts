export class LesScoietes {
    IDLesSocietes!: number
    Logo!: string
    NomSociete!: string
    Adresse!: string
    MatFiscale!: string
    CP!: string
    Ville!: string
    Pays!: string
    Tel!: string
    Fax!: string
    Email!: string
    Web!: string
    Echeance!: number
    DateCreation!: string
    RemiseEnPourcentage!: number
    Status!: number
    CodeSociete!: string
    IDDEPARTEMENT!: number
    DateModification!: string
}

export class DialogLesScoietesData {
    societe!: LesScoietes;
    action!: 'create' | 'update';
  }