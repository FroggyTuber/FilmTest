import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;

  constructor(private movieService:MovieService, private loadingController:LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(){
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading movies...',
    });

    await loading.present();

    this.movieService.getMovies(this.currentPage).subscribe((response) => {
      loading.dismiss();
      console.log(response);
    });
  }

}
