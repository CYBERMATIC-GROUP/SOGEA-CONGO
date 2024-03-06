import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Genre } from '../../models/genre.models';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss'],
})
export class GenreFormComponent implements OnInit {
  IDGenre!: string;
  GenreVoiture!: string;
  @Input() justCloseAfterSubmit!: boolean;
  @Input() action !: "create" | "edit" | "view"
  GenreVoitureID: any;

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {

 
    if (this.IDGenre) {
      
      this.initForUpdate(this.IDGenre)
   }
    console.log(this.IDGenre);
    console.log(this.action)

  }

  initForUpdate(GENREID: string) {
    this.genreService.getOne(GENREID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDGenre = data.IDGenre;
      this.GenreVoiture = data.GenreVoiture;


    });
  }

  onSubmitForm(form: NgForm) {

    const genre: Genre = form.value;

    genre.IDGenre = this.IDGenre;
    genre.GenreVoiture = this.GenreVoiture

    if (this.action === 'edit') {
      this.genreService
        .update(genre)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.status);
            return [];
          })
        )
        .subscribe(
          (data) => {
            console.log(data);
            const msg = "genre " + genre.GenreVoiture + " modifié !";
            this.toast.success(msg, "Ajour");
            this.dialog.closeAll();
            this.reloadPage();
          },
          (error) => console.log(error)
        );
    } else {
      this.genreService
        .create(genre)
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

            const msg = "genre " + genre.GenreVoiture + " ajouté!";
            this.toast.success(msg, "Ajout");
           
          },
          (error) => console.log(error)
        );
    }
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/voiture/genre']);
    });
  }
}
