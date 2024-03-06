import { Component, Input } from '@angular/core';
import { ModeleAutomobileService } from '../../services/modele.automobile.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModeleAutomobile } from '../../models/modele.automobile.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modele-automobile-form',
  templateUrl: './modele-automobile-form.component.html',
  styleUrls: ['./modele-automobile-form.component.scss'],
})
export class ModeleAutomobileFormComponent {
  @Input() action!: 'create' | 'edit' | 'view';

  IDTypeAutomobile!: string;
  NomType!: string;
  CodeType!: string;

  constructor(
    private modelserice: ModeleAutomobileService,
    private router: Router,
    public _location : Location,
    public dialog:MatDialog,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    if (this.IDTypeAutomobile) {
      this.initForUpdate(this.IDTypeAutomobile);
    }

    console.log(this.IDTypeAutomobile);
    console.log(this.action);
  }

  initForUpdate(MarqueAutomobileID: string) {
    this.modelserice
      .get(MarqueAutomobileID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.IDTypeAutomobile = data.IDTypeAutomobile;
        this.CodeType = data.CodeType;
        this.NomType = data.NomType;
      });
  }

  onSubmitForm(form: NgForm) {
    const model: ModeleAutomobile = form.value;

    model.IDTypeAutomobile = this.IDTypeAutomobile;
    model.CodeType = this.CodeType;
    model.NomType = this.NomType;

    if (this.action === 'edit') {
      this.modelserice
        .update(model)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "model " + model.NomType + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.modelserice
        .create(model)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            const msg = "model " + model.NomType + " ajouté!";
            this.toast.success(msg, "Ajout");
            this.dialog.closeAll();
            this.reloadPage();

          },
          (error) => console.log(error)
        );
    }
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/model/list']);
    });
  }
}
