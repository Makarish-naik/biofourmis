import {
  Component,
  ElementRef,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { throttle } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('virtualScroll') virtualScoll!: ElementRef;
  istitleSorted = false;
  isPopularitySorted = false;
  searchText = '';
  showGenres = false;
  generes: { id: number; name: string }[] = [];
  movieList: Movie[] = [];
  page = 1;
  genereId: any;
  genreName: string | undefined = 'Popular';
  timer: any;
  constructor(private movieServices: MovieService) {}

  ngOnInit(): void {
    this.getMoviesByName();
    this.getGenres();
  }

  onFocus() {
    this.showGenres = true;
  }
  onBlur() {
    setTimeout(() => {
      this.showGenres = false;
    }, 500);
  }
  getGenres() {
    this.movieServices
      .getGeneres()
      .subscribe((generes: { id: number; name: string }[]) => {
        this.generes = generes;
      });
  }
  onClickOfGenre(event: any) {
    this.genereId = event.target.id;
    this.page = 1;
    this.movieList = [];

    let genre = this.generes.find((genre) => genre.id == this.genereId);
    this.genreName = genre?.name;
    this.searchText = '';
    this.getMoviesByGenere();
  }
  onClickOfSearch() {
    this.page = 1;
    this.genereId = null;
    this.genreName = 'Popular';
    this.movieList = [];
    this.getMoviesByName();
    this.showGenres = false;
  }
  onClickOfTitle() {
    this.isPopularitySorted = false;
    this.istitleSorted = !this.istitleSorted;
    this.page = 1;
    this.movieList = [];
    this.getMoviesByGenere();
  }
  onClickOfPopularity() {
    this.istitleSorted = false;
    this.isPopularitySorted = !this.isPopularitySorted;
    this.page = 1;
    this.movieList = [];
    this.getMoviesByGenere();
  }
  getMoviesByGenere() {
    let reqParams = {
      with_genres: this.genereId,
      page: this.page,
      sort_by: this.istitleSorted ? 'original_title.asc' : 'popularity.desc',
    };
    this.movieServices.getMovieByGenre(reqParams).subscribe((movieList) => {
      if (this.page > 1) {
        this.movieList.push(...movieList);
      } else {
        this.movieList = movieList;
      }
    });
  }
  getMoviesByName() {
    this.movieServices
      .getMovieByName(this.searchText, this.page)
      .subscribe((movieList) => {
        if (this.page > 1) {
          this.movieList.push(...movieList);
        } else {
          this.movieList = movieList;
        }
      });
  }
  virtualScroll() {
    this.page++;
    if (!this.genereId) {
      this.getMoviesByName();
    } else {
      this.getMoviesByGenere();
    }
  }
  handleScroll(e: any) {
    let scrollPosition = e.target.scrollHeight - e.target.scrollTop - 200;
    const bottom = scrollPosition < e.target.clientHeight;

    if (bottom) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.virtualScroll();
      }, 500);
    }
  }
}
