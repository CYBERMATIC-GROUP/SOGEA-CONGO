import { Component, Inject, OnInit } from '@angular/core';
import {
  Departement,
  DialogDepartementData,
} from '../../models/departement.models';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from '../../services/departement.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError } from 'rxjs';
import { Location } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deparement-form',
  templateUrl: './deparement-form.component.html',
  styleUrls: ['./deparement-form.component.scss'],
})
export class DeparementFormComponent implements OnInit {
  paramIDCategory!: number;
  departement!: Departement;

  IDDEPARTEMENT!: number;
  CodeDepartement!: string;
  NomDepartement!: string;
  Ordre!: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: DepartementService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDepartementData,
    public dialog: MatDialog,
    private router: Router,
    public _location:Location,
    private toast:ToastrService
    
  ) {}

  ngOnInit(): void {
    this.IDDEPARTEMENT = this.dialogData.departement.IDDEPARTEMENT;
    this.CodeDepartement = this.dialogData.departement.CodeDepartement;
    this.NomDepartement = this.dialogData.departement.NomDepartement;
    this.Ordre = this.dialogData.departement.Ordre;
  }

  createDepartement() {
    let payload: Departement = {
      IDDEPARTEMENT: this.IDDEPARTEMENT,
      CodeDepartement: this.CodeDepartement,
      NomDepartement: this.NomDepartement,
      Ordre: this.Ordre,
    };

    this.categoryService
      .create(payload)
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);
        const msg = "departement " + payload.NomDepartement + " ajouté!";
        this.toast.success(msg, "Ajout");
        this.dialog.closeAll();
        this.reloadPage();
      });
  }

  updateDepartement() {
    let payload: Departement = {
      IDDEPARTEMENT: this.IDDEPARTEMENT,
      CodeDepartement: this.CodeDepartement,
      NomDepartement: this.NomDepartement,
      Ordre: this.Ordre,
    };

    this.categoryService
      .update(payload)
      .pipe(
        catchError((err, caught) => {
          console.log('err', err);
          console.log('caught', caught);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);
        const msg = "departement " + payload.NomDepartement + " modifié !";
        this.toast.success(msg, "Ajour");
        this.dialog.closeAll();
        this.reloadPage();
      });
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/departement']);
    });
  }
}