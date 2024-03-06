import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Genre } from '../../models/genre.models';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Liasse } from '../../models/liasse.model';
import { LiasseService } from '../../services/liasse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liasse-form',
  templateUrl: './liasse-form.component.html',
  styleUrls: ['./liasse-form.component.scss']
})
export class LiasseFormComponent {

  IDLIASSE!:string
  CodeLiasse!:string
  LibelléLiasse_Ar!:string
  LibelleLiasse!:string


  @Input() action !: "create" | "edit" | "view"
  justCloseAfterSubmit: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private liasseService:LiasseService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {

 
    if (this.IDLIASSE) {
      
      this.initForUpdate(this.IDLIASSE)
   }
    console.log(this.IDLIASSE);
    console.log(this.action)

  }

  initForUpdate(LIASSEID: string) {
    this.liasseService.get(LIASSEID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDLIASSE = data.IDLIASSE;
      this.LibelleLiasse = data.LibelleLiasse;
      this.CodeLiasse = data.CodeLiasse;
      this.LibelléLiasse_Ar = data.LibelléLiasse_Ar;


    });
  }

  onSubmitForm(form: NgForm) {

    const liasse: Liasse = form.value;

    liasse.IDLIASSE = this.IDLIASSE;


    if (this.action === 'edit') {
      this.liasseService
        .update(liasse)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "liasse " + liasse.LibelleLiasse + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.liasseService
        .create(liasse)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            const msg = "liasse " + liasse.LibelleLiasse + " ajoutée!";
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
      this.router.navigate(['/voiture/liasse/list']);
    });
  }

}
