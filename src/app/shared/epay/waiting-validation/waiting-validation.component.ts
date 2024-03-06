import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EpayService } from '../../services/epay.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
import { routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-waiting-validation',
  templateUrl: './waiting-validation.component.html',
  styleUrls: ['./waiting-validation.component.scss']
})
export class WaitingValidationComponent {
  @Input() message!: string;
  @Input() IDSOUSCRIPTION!: number;
  retour!: string;
  isLoader!: boolean;
  title!: string;
  @Input() IDTransaction!: string;
  intervalID!: any;
  settimeoutIntervalID: any;
  //is set to determine if action is already finished, becose our request is asynchrone
  //to avoid to duplicate good response after validation we stop it
  operationTerminate!: boolean;

  constructor(
    private epayService: EpayService,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setIntervalVerification()
  }

  onBack(){
    this.dialog.closeAll();
    clearInterval(this.intervalID)
    clearInterval(this.settimeoutIntervalID)
  }

  onVerification(){
    this.isLoader = true;

    return this.epayService.verifPay(this.IDTransaction).pipe(
      tap(verif => {
        console.log(verif);

        if(verif && verif.Etat == 2){
          if(!this.operationTerminate){
            this.globalService.toastShow('Versement anticipé avec succès', 'Versement');
            this.dialog.closeAll();

            const redirectionUrl = '/' + routesConstantes.espaceProprietaire.detailsSouscription + '/' + this.IDSOUSCRIPTION

            this.router.navigate([redirectionUrl])
            this.isLoader = false;
          }
          clearInterval(this.intervalID)
        }
      }),
      map(verif => verif.Etat)
    )
  }

  onContinue(){
  }

  setIntervalVerification(){
    this.onVerification().subscribe();
    this.intervalID = setInterval(() => {
      console.log('verif interval')
      this.onVerification().subscribe();
    }, 2000);

    const transacNonFinish = () => {
      clearInterval(this.intervalID);
      const msg = 'Transaction non finalisée. Si vous venez de valider la transaction, prière de procéder à la vérification manuelle.';
      const ref = this.globalService.alert(msg, 'Transaction initialisée', "success", 'Annuler', 'Verification manuelle');
      
      ref.afterClosed().subscribe(result => {
        if(result){
          this.onVerification().subscribe(etat => {
            if(etat != 2){
              transacNonFinish();
            }
          })
        }
      });
    }

    this.settimeoutIntervalID = setTimeout(() => {
        this.isLoader = false;
        transacNonFinish();

    }, 1000*90);
  }
}
