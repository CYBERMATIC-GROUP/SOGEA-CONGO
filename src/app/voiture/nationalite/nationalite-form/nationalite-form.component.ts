import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../services/nationalite.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global.service';
@Component({
  selector: 'app-nationalite-form',
  templateUrl: './nationalite-form.component.html',
  styleUrls: ['./nationalite-form.component.scss']
})
export class NationaliteFormComponent {

  IDNationalite!:string
  LibNationalite!:string

  @Input() action !: "create" | "edit" | "view"
  justCloseAfterSubmit: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private nationalite:NationaliteService,
    private toast:ToastrService,
    private globalService:GlobalService
  ) {}

  ngOnInit(): void {

 
    if (this.IDNationalite) {
      
      this.initForUpdate(this.IDNationalite)
      
   }
    console.log(this.IDNationalite);
    console.log(this.action)

  }

  initForUpdate(NationaliteID: string) {
    this.nationalite.getOne(NationaliteID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDNationalite = data.IDNationalite;
      this.LibNationalite = data.LibNationalite;


    });
  }

  onSubmitForm(form: NgForm) {

    const nationalite: Nationalite = form.value;

    nationalite.IDNationalite = this.IDNationalite;


    if (this.action === 'edit') {
      this.nationalite
        .update(nationalite)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "nationalité " + nationalite.LibNationalite + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.nationalite
        .create(nationalite)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "nationalité " + nationalite.LibNationalite + " ajoutée!";
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
      this.router.navigate(['/voiture/nationalite/list']);
    });
  }

}
