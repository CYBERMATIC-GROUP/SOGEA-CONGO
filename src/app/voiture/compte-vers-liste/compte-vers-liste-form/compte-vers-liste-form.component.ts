import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { CompteVersListe } from '../../models/compteVersListe.model';
import { CompteVersListeService } from '../../services/compte-vers-liste.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compte-vers-liste-form',
  templateUrl: './compte-vers-liste-form.component.html',
  styleUrls: ['./compte-vers-liste-form.component.scss']
})
export class CompteVersListeFormComponent implements OnInit {

  @Input() action !: "create" | "edit" | "view"

  IDCOMPTE!: string
  CodeCompte!: string
  LibelleCompte!: string

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private compte:CompteVersListeService
  
  ) {}

  ngOnInit(): void {

 
    if (this.IDCOMPTE) {
      
      this.initForUpdate(this.IDCOMPTE)
   }
    console.log(this.IDCOMPTE);
    console.log(this.action)

  }

  initForUpdate(COMPTEID: string) {
    this.compte.get(COMPTEID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);



    });
  }

  onSubmitForm(form:NgForm) {

    const compte: CompteVersListe = form.value;

    compte.IDCOMPTE = this.IDCOMPTE;


    if (this.action === 'edit') {
      this.compte
        .update(compte)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            location.reload()
          },
          (error) => console.log(error)
        );
    } else {
      this.compte
        .create(compte)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);

            this.router.navigateByUrl("voiture/fonction")
          },
          (error) => console.log(error)
        );
    }
  }


}
