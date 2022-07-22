import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ErrorConsts } from 'src/app/models/error.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm= new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  constructor(private router: Router,
    private authService:AuthService,
    private toastService:ToastService) {}

  ngOnInit(): void {
    sessionStorage.clear()
  }
  get userID() {
    return this.loginForm.get('id');
  }

  get password() {
    return this.loginForm.get('password');
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  submit(e: Event) {
    e.preventDefault();
    this.authService.login(this.loginForm.value as any).subscribe(message=>{
      if(!message.error){
        sessionStorage.setItem('auth','token')
        this.router.navigate(['post-login']);
      }
    },
    (error:{error:ErrorConsts})=>{
      if(error.error==ErrorConsts.INVALID_PASSWORD){
        this.toastService.showToast('Please enter valid password')
      }else if(error.error==ErrorConsts.INVALID_USER){
        this.toastService.showToast('User not found. Please register',1000)

      }

    }
    )
  }
}
