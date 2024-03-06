import { Component, Input, OnInit } from '@angular/core';
import { Station } from '../../models/station.model';
import { StationsService } from '../../services/sations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stations-form',
  templateUrl: './stations-form.component.html',
  styleUrls: ['./stations-form.component.scss']
})
export class StationsFormComponent implements OnInit {
  @Input() action!: "edit" | "view" | "create";
  @Input() station!: Station;

  isLoading = false;
  stationForm!: FormGroup;
  stationFormPreview$!: Observable<Station>

  constructor(
    private stationService: StationsService,
    private formBuild: FormBuilder,
    public dialog: MatDialog,
    private toast: ToastrService,
    private globalService: GlobalService,
    private router: Router
  ){}

  ngOnInit(): void {
    
    this.initForm();
  }

  initForm(){
    this.stationForm = this.formBuild.group({
      IDSTATIONS: [null], 
      CiodeStation: [null, [Validators.required]],
      NomStation: [null, [Validators.required]],
      Adresse: [null, [Validators.required]],
      Logo: [null],
      login: [null, [Validators.required]]
    });

    this.stationFormPreview$ = this.stationForm.valueChanges.pipe(
      map(res => ({
        ...this.stationForm.value,
        IDSTATIONS: this.station.IDSTATIONS
      }))
    );

    if((this.action == "edit" || this.action == "view") && this.station){
      this.isLoading = true;
      this.stationService.getOne(this.station.IDSTATIONS).subscribe(data => {
        this.stationForm.patchValue(data);
        this.isLoading = false;
      })
    }
  }

  delete(){
    const msg = "Voulez-vous retirer la station " + this.station.NomStation + " ?";
    const ref = this.globalService.alert(msg, "Suppresion", "danger", "NON", "OUI");
    
    ref.afterClosed().subscribe(res => {
      
      if(res){
        this.isLoading = true;
        this.stationService.delete(this.station.IDSTATIONS).subscribe(data => {
          this.isLoading = false;
          this.toast.success("Station " + this.station.NomStation + " supprimée avec succes !", "Suppression");
          this.reloadPage();
          this.dialog.closeAll();
        });
      }

    })

  }

  submitForm(){

    const station: Station = this.stationForm.value;

    if(this.action == "create"){
      this.stationService.create(station).subscribe((res) => {
        const msg = "Station " + station.NomStation + " ajoutée !";
        this.toast.success(msg, "Ajout");
        this.dialog.closeAll();
        this.reloadPage();
      })
    }
    else if(this.action == "edit"){
      this.stationService.update(station).subscribe((res) => {
        const msg = "Station " + station.NomStation + " mise à jour !";
        this.toast.success(msg, "Ajout");
        this.dialog.closeAll();
        this.reloadPage();
      })
    }
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/station/liste']);
    });
  }

  onEdit(){
    this.action = "edit";
  }

}
