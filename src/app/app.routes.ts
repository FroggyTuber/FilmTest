import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadComponent: () => import('./movies/movies.page').then( m => m.MoviesPage)
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
];
