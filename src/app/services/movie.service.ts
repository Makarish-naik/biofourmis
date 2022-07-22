import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppUrls } from '../models/api-urls';
import { ApiHandlerService } from './api-handler.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apihandler:ApiHandlerService,
    private toastServices:ToastService) { }
  getMovieByGenre(reqParams:{page:number,with_genres:string,sort_by:string }){

    return this.apihandler.get(AppUrls.dicover,reqParams).pipe(
      map((data:any)=>{
      if(data.results){
        return data.results
      }else{
        this.toastServices.showToast(data.status_message)
      }

    }))

  }
  getPopularMovie(page:number){
    let reqParams={
      page
    }
    return this.apihandler.get(AppUrls.movies,reqParams).pipe(
      map((data:any)=>{
      if(data.results){
        return data.results
      }else{
        this.toastServices.showToast(data.status_message)
      }

    }))

  }
  getMovieByName(name:string|null,page:number){
    let reqParams={
      query:name,
      page
    }
    if(!name){
       return this.getPopularMovie(page)
    }else{

      return this.apihandler.get(AppUrls.byName,reqParams).pipe(
        map((data:any)=>{
        if(data.results){
          return data.results
        }else{
          this.toastServices.showToast(data.status_message)
        }

      }))
    }

  }
  getGeneres(){
    return this.apihandler.get(AppUrls.genere).pipe(
      map((data:any)=>{
      if(data.genres){
        return data.genres
      }else{
        this.toastServices.showToast(data.status_message)
      }
    }))

  };
}
