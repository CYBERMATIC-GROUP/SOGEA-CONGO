import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { FonctionAgentService } from 'src/app/voiture/services/fonction-agent.service';
import { FonctionAgent } from 'src/app/voiture/models/fonctionAgent.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fonction-agent-form',
  templateUrl: './fonction-agent-form.component.html',
  styleUrls: ['./fonction-agent-form.component.scss']
})
export class FonctionAgentFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDFonction_agent!:string
  Libele!:string

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fonctionService:FonctionAgentService,
    public _location:Location,
    public dialog : MatDialog,
    private toast:ToastrService
  
  ) {}

  ngOnInit(): void {

 
    if (this.IDFonction_agent) {
      
      this.initForUpdate(this.IDFonction_agent)
   }
    console.log(this.IDFonction_agent);
    console.log(this.action)

  }

  initForUpdate(Fonction_agentID: string) {
    this.fonctionService.getOne(Fonction_agentID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDFonction_agent = data.IDFonction_agent;
      this.Libele = data.Libele;


    });
  }

  onSubmitForm(form: NgForm) {

    const fonctionagent: FonctionAgent = form.value;

    fonctionagent.IDFonction_agent = this.IDFonction_agent;
    fonctionagent.Libele = this.Libele

    if (this.action === 'edit') {
      this.fonctionService
        .update(fonctionagent)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "fonction " + fonctionagent.Libele + " modifiée !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.fonctionService
        .create(fonctionagent)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "fonction " + fonctionagent.Libele + " ajoutée!";
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
      this.router.navigate(['/voiture/fonction']);
    });
  }


}
