import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeAutomobile } from '../../models/type-automobile.models';
import { TypeAutomobileService } from '../../services/type-automobile.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-automobile-form',
  templateUrl: './type-automobile-form.component.html',
  styleUrls: ['./type-automobile-form.component.scss']
})
export class TypeAutomobileFormComponent {
  @Input() justCloseAfterSubmit!: boolean;
  IDTypeAutomobile!: string
  NomType!: string
  CodeType!: string

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private typeAutomobileService : TypeAutomobileService,
    public dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {

 
    if (this.IDTypeAutomobile) {
      
      this.initForUpdate(this.IDTypeAutomobile)
   }
    console.log(this.IDTypeAutomobile);
    console.log(this.action)

  }

  initForUpdate(TypeAutomobileID: string) {
    this.typeAutomobileService.getOne(TypeAutomobileID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDTypeAutomobile = data.IDTypeAutomobile;
      this.CodeType = data.CodeType;
      this.NomType = data.NomType


    });
  }

  onSubmitForm(form: NgForm) {

    const typeAutomobile: TypeAutomobile = form.value;

    typeAutomobile.IDTypeAutomobile = this.IDTypeAutomobile;


    if (this.action === 'edit') {
      this.typeAutomobileService
        .update(typeAutomobile)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            const msg = "type automobile " + typeAutomobile.NomType + " modifié !";
            this.toast.success(msg, "mise à jour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.typeAutomobileService
        .create(typeAutomobile)
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
              const msg = "type automobile " + typeAutomobile.NomType + " ajouté!";
              this.toast.success(msg, "Ajout");
              this.dialog.closeAll();
              this.reloadPage();
            }

          },
          (error) => console.log(error)
        );
    }
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/typeAutomobile/list']);
    });
  }


}
