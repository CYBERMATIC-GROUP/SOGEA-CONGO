import { Component, Input, OnInit } from '@angular/core';
import { MarqueAutomobileService } from '../../services/marque-automobile.service';
import { NgForm } from '@angular/forms';
import { MarqueAutomobile } from '../../models/marqueAutomobile';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-marque-auto-form',
  templateUrl: './marque-auto-form.component.html',
  styleUrls: ['./marque-auto-form.component.scss'],
})
export class MarqueAutoFormComponent implements OnInit {
  @Input() action!: 'create' | 'edit' | 'view';
  @Input() justCloseAfterSubmit!: boolean;
  IDMarqueAutomobile!: number;
  Marque!: string;

  constructor(
    private marqueautomobileService: MarqueAutomobileService,
    private router: Router,
    public dialog: MatDialog,
    private toast: ToastrService,
    public _location:Location
  ) {}

  ngOnInit(): void {
    if (this.IDMarqueAutomobile) {
      this.initForUpdate(this.IDMarqueAutomobile);
    }
  }

  initForUpdate(MarqueAutomobileID: number) {
    this.marqueautomobileService
      .getOne(MarqueAutomobileID)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.IDMarqueAutomobile = data.IDMarqueAutomobile;
        this.Marque = data.Marque;
      });
  }

  onSubmitForm(form: NgForm) {
    const MarqueAutomobile: MarqueAutomobile = form.value;

    MarqueAutomobile.IDMarqueAutomobile = this.IDMarqueAutomobile;
    MarqueAutomobile.Marque = this.Marque;

    if (this.action === 'edit') {
      this.marqueautomobileService
        .update(MarqueAutomobile)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "marque " + MarqueAutomobile.Marque + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.marqueautomobileService
        .create(MarqueAutomobile)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            if(this.justCloseAfterSubmit){
              this.dialog.closeAll();
            }else{
              this.dialog.closeAll();
              this.reloadPage();
            }
            const msg = "marque " + MarqueAutomobile.Marque + " ajoutée!";
            this.toast.success(msg, "Ajout");
          },
          (error) => console.log(error)
        );
    }
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/marqueAutomobile/list']);
    });
  }
}
