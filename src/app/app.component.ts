import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'biofourmis';
  toast = '';
  timer:any;
  constructor(private toastService: ToastService) {}
  ngOnInit() {

 this.subscribeToast()
  }
  subscribeToast(){
    this.toastService.toast.subscribe(
      (data: { message: string; duration: number }) => {
        this.toast = data.message;
        if(this.timer)clearTimeout(this.timer)
        this.timer=setTimeout(() => {
          this.toast = '';
        }, data.duration);
      }
    );
  }
}
