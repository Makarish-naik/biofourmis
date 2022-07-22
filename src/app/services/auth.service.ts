import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ErrorConsts } from '../models/error.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 users:User[]=[
  {id:'makarish@gmail.com', password:'test'},
  {id:'raju@gmail.com', password:'test'}
 ]
  constructor() { }
  login(requestParams:User){
    return new Observable((observer:Observer<{error:ErrorConsts|null}>)=>{
      let user=this.users.find(user=>user.id==requestParams.id)
      if(user){
        if(user.password==requestParams.password){
          observer.next({error:null});
          observer.complete()
        }else{
          observer.error({error: ErrorConsts.INVALID_PASSWORD})
          observer.complete()
        }

      }
      observer.error({error:ErrorConsts.INVALID_USER})
      observer.complete()
    })


  }
}
