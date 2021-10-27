import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  imgLink: string = "https://image.tmdb.org/t/p/original";


  MoviesData: any[] = [];
  tvData: any[] = [];
  p: number = 1;

  ngxNext: string = '';
  ngxPrevious: string = '';

  collection: any[] = [];


  constructor(private _MoviesService: MoviesService) {
    this.displayMovies(1);
    this.displayTv(1);
  }
  
  displayMovies(pageNum:number) {
    this._MoviesService.getPopularMovies(pageNum, "movie").subscribe(
      (data) => {
        this.MoviesData = data.results.slice(0, 10);
      }
    );
  }
  
  displayTv(pageNum:number) {
    this._MoviesService.getPopularMovies(pageNum, "tv").subscribe(
      (data) => {
        this.tvData = data.results.slice(0, 10);
      }
    );
  }
  


  ngOnInit(): void {
    this._MoviesService.changePaginationText();
    this.ngxNext = this._MoviesService.ngxNext;
    this.ngxPrevious= this._MoviesService.ngxPrevious;

      window.addEventListener("resize", () => {
        this._MoviesService.changePaginationText();
        this.ngxNext = this._MoviesService.ngxNext;
        this.ngxPrevious= this._MoviesService.ngxPrevious;
      });
  }

}
