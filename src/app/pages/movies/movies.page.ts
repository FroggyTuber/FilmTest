import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInfiniteScrollContent, IonInfiniteScroll, IonIcon, IonFab, IonFabButton, IonSearchbar } from '@ionic/angular/standalone';
import { MovieService } from '../../movie.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar, IonFabButton, IonFab, 
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, 
    IonLabel, IonItem, IonList, IonContent, IonHeader, 
    IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule
  ]
})

export class MoviesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  movies: any[] = [];
  searchedMovies: any[] = [];
  currentPage = 1;

  constructor(private movieService:MovieService, private loadingController:LoadingController) { }

  ngOnInit() {
    this.loadMovies();

    const element = document.querySelector('ion-list'); 
    
    if (!element) {
      return;
    }
    const hasOverflow = element.scrollHeight > element.clientHeight;

    if (!hasOverflow) {
      this.loadMore({ target: { complete: () => {}, disabled: true } } as any);
    }

  }

  async loadMovies() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading movies...',
    });

    await loading.present();

    this.movieService.getMovies(this.currentPage).subscribe((response) => {
      loading.dismiss();
      this.movies.push(...response.results);
      console.log(response);
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.movieService.getMovies(this.currentPage).subscribe((response) => {
      this.movies.push(...response.results);
      console.log(response);

      event.target.complete();
      event.target.disabled = this.currentPage === response.total_pages;
    });
  }

  searchMovies(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.trim().toLowerCase() || '';
  
    if (!query) {
      this.searchedMovies = []; // Si el campo está vacío, mostramos la lista normal
      return;
    }
  
    this.movieService.searchMovies(query).subscribe((response) => {
      this.searchedMovies = response.results;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
