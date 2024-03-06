import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpayService } from '../services/epay.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { WaitingValidationComponent } from './waiting-validation/waiting-validation.component';

@Component({
  selector: 'app-epay',
  templateUrl: './epay.component.html',
  styleUrls: ['./epay.component.scss']
})
export class EpayComponent {
  Matricule!: string;
  isLoading!: boolean;
  telNumber!: string;
  Immatriculation!: string;
  Montant!: string;
  canSubmit!: boolean;
  numberInvalid!: boolean;
  IDSOUSCRIPTION!: number;
  message!: string
  showError!: boolean;
  IDTRANSACTION!: string;

  //paiement set
  

  constructor(
    private route: ActivatedRoute,
    private epayService: EpayService,
    private globalService: GlobalService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.Montant = this.route.snapshot.params['montant'];
    this.telNumber = this.route.snapshot.params['mobile'];
    this.Immatriculation = this.route.snapshot.params['immatriculation'];
    this.IDSOUSCRIPTION = this.route.snapshot.params['idsouscription'];
    this.initData();
  }

  initData(){
    const identifiant = this.route.snapshot.params['identifiant'];
    /*this.transactionService.getTransactionByIdentifiant(identifiant).subscribe((data) => {
      this.dataTrans = data;
      console.log(data);
      this.Matricule = this.dataTrans.matriculeClient;
      this.Montant = this.dataTrans.montant;
      this.cookie.set('retour', this.dataTrans.retour);
      this.isLoading = false;
    }, (error) => {
      console.log(error);
      this.isLoading = false;
      this.transactionService.raiseServeurError();
    })*/
  }

  onSubmitpayement(form: NgForm, reseau: "mtn" | "airtel"){
    /*let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : true
    };
    form.value.bank = reseau === 'airtel' ? "AIRTEL MONEY" : "MTN MOBILE MONEY";
    this.isShowed = true;
    const modalRef = this.modalService.open(PayementComponent, ngbModalOptions);
    //modalRef.componentInstance.formPreview = form.value;
    modalRef.componentInstance.reseau = reseau;
    modalRef.componentInstance.dataTrans = this.dataTrans;*/
  }

  onInputNumToDebit(event: any){
    const tel = event.target.value;
    this.telNumber = tel;

    const regex = /^((05)|(04)|(06))[0-9]{7}$/;

    if(tel.length > 0 && regex.test(tel)){
      this.canSubmit = true;
      this.showError = false;
    }else{
      this.canSubmit = false;
      this.showError = true;
    }
  }

  onValid(){
    this.isLoading = true;
    this.epayService.setPay(Number(this.Montant), this.telNumber, this.IDSOUSCRIPTION).subscribe(data => {
      console.log(data)
      this.isLoading = false;
      if(data && data.Status == 1){
        this.verif(data, this.IDSOUSCRIPTION);
      }else{
        this.globalService.alert('Erreur reseau !', 'Ereur', "danger", '', 'OK'); 
      }

    })
  }

  verif(data: any, idsouscription: number){

    const ref = this.dialog.open(WaitingValidationComponent)
    ref.componentInstance.IDTransaction = data.IDTransaction;
    ref.componentInstance.message = data.sMessage;
      //const ref = this.globalService.alert(this.message, 'Transaction initialisée', "success", '', 'Verification manuelle');

      /*ref.afterClosed().subscribe(resultat => {
        this.globalService.toastShow('Verication en cours...', 'Verification');

        this.epayService.verifPay(data.IDTransaction).subscribe(verif => {
          console.log(verif);

          if(verif && verif.Etat == 2){
            this.globalService.toastShow('Versement anticip', 'Succes');
            this.router.navigate(['/details-souscription/' + idsouscription])
          }else{
            this.message = "Transaction non finalisee";
            this.verif(data, idsouscription);
          }
        });

      })*/

  }
}
