import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = new Subject<{message:string, duration:number}>();
  constructor() {}
  showToast(message:string, duration = 1000) {
    this.toast.next({ message, duration });
  }
}
