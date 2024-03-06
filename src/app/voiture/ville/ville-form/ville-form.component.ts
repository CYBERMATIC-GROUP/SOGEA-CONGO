import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Ville } from '../../models/ville.model';
import { VilleService } from '../../services/ville.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.scss']
})
export class VilleFormComponent {

  IDville!:string
  Libele!:string

  @Input() action !: "create" | "edit" | "view"

  justCloseAfterSubmit: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private villeService:VilleService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {

 
    if (this.IDville) {
      
      this.initForUpdate(this.IDville)
      
   }
    console.log(this.IDville);
    console.log(this.action)

  }

  initForUpdate(villeID: string) {
    this.villeService.getOne(villeID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDville = data.IDville;
      this.Libele = data.Libele;


    });
  }

  onSubmitForm(form: NgForm) {

    const ville: Ville = form.value;

    ville.IDville = this.IDville;


    if (this.action === 'edit') {
      this.villeService
        .update(ville)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
      
            const msg = "ville " + ville.Libele + " modifiée !";
            this.toast.success(msg, "mise à jour");
            this.dialog.closeAll();
            this.reloadPage();



          },
          (error) => console.log(error)
        );
    } else {
      this.villeService
        .create(ville)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "ville " + ville.Libele + " ajoutée!";
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
      this.router.navigate(['/voiture/ville/list']);
    });
  }


}
