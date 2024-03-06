import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class EpayService {
  uri = '/sogeacongo/v1/MOBILE_MONEY_Demande_Paiement/';
  constructor(
    private globalService: GlobalService
  ) { }

  setPay(montant: number, mobile: string, IDSOUSCRIPTION: number){
    const uri = this.uri + montant + '/' + mobile + '/' + IDSOUSCRIPTION;



    return this.globalService.setHttpRequest(uri, "POST", {})

  }


  verifPay(itrans: string){
    const uri = '/sogeacongo/v1/MOBILE_MONEY_Verifie_Statut_Transaction/' + itrans;
    return this.globalService.setHttpRequest(uri, 'GET')
  }
}
