import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { AmortissementService } from 'src/app/services/amortissement.service';
import { routesConstantes } from 'src/environements/constante';

@Component({
  selector: 'app-souscription-form',
  templateUrl: './souscription-form.component.html',
  styleUrls: ['./souscription-form.component.scss']
})
export class SouscriptionFormComponent {
  
  @Input() IDSOUSCRIPTIONS!: number;
  @Input() Immatriculation!: string;
  valueAmount!: number;
  isLoading!: boolean;
  

  constructor(
    public dialog: MatDialog,
    private amortissementService: AmortissementService,
    private globalService: GlobalService,
    private router: Router
    
  ){}
  
  onInput(event: any){
    this.valueAmount = event.target.value;
  }

  onSubmit(val: any){
    this.isLoading = true;
    this.valueAmount = val.value;

    this.dialog.closeAll();
    this.router.navigate([ '/' + routesConstantes.espaceProprietaire.baseRoute + '/paiement/' + this.valueAmount + '/' + this.IDSOUSCRIPTIONS + '/' + this.Immatriculation]);

    /*this.amortissementService.setVersement(this.valueAmount, this.IDSOUSCRIPTIONS).subscribe(res => {
      this.dialog.closeAll();
      this.isLoading = false;

      this.globalService.toastShow("Nouveau versement ajouté !", "Succès");
      this.globalService.reloadComponent('/details-souscription/' + this.IDSOUSCRIPTIONS)
      this.router.navigate(['/liste-souscription'])
    })*/
  }
}
