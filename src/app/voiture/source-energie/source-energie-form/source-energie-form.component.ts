import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceEnergie } from '../../models/source-energie';
import { SourceEnergieService } from '../../services/source-energie.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global.service';


@Component({
  selector: 'app-source-energie-form',
  templateUrl: './source-energie-form.component.html',
  styleUrls: ['./source-energie-form.component.scss']
})
export class SourceEnergieFormComponent {

  IDSourceEnergie!: number
  CodeSourseEnergie!: string
  SourceEnergie!: string

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private sourceEnergieService:SourceEnergieService,
    public _location :Location,
    public dialog : MatDialog,
    private toast:ToastrService,
    private globalService:GlobalService
  
  ) {}

  ngOnInit(): void {

 
    if (this.IDSourceEnergie) {
      
      this.initForUpdate(this.IDSourceEnergie)
   }
    console.log(this.IDSourceEnergie);
    console.log(this.action)

  }

  initForUpdate(SourceEnergieID: number) {
    this.sourceEnergieService.get(SourceEnergieID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDSourceEnergie = data.IDSourceEnergie;
      this.CodeSourseEnergie = data.CodeSourseEnergie;
      this.SourceEnergie = data.SourceEnergie


    });
  }

  onSubmitForm(form: NgForm) {

    const sourceenergie: SourceEnergie = form.value;

    sourceenergie.IDSourceEnergie = this.IDSourceEnergie;


    if (this.action === 'edit') {
      this.sourceEnergieService
        .update(sourceenergie)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "source energie " + sourceenergie.SourceEnergie + " modifiée !";
            this.toast.success(msg, "mise à jour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.sourceEnergieService
        .create(sourceenergie)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "source energie " + sourceenergie.SourceEnergie + " ajoutée!";
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
      this.router.navigate(['/voiture/sourceEnergie/list']);
    });
  }
}
