import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonImg, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { LanguagePipe } from 'src/app/pipes/language.pipe';
import { ImagePipe } from 'src/app/pipes/image.pipe';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [
    IonLabel, IonImg, IonText, IonCardTitle, IonCardHeader, 
    IonCardContent, IonCard, IonButtons, IonBackButton, IonContent, 
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    LanguagePipe, ImagePipe
  ]
})
export class MovieDetailsPage implements OnInit {
  movie:any = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovieDetails(id!).subscribe((response) => {
      this.movie = response;
    });
  }

}
