import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }

  onLogIn() {
    this.authService.login({email: 'longxuanho@gmail.com', password: 'longlongbk'})
      .subscribe((success) => {
        console.log('success');
      }, (error) => {
        console.log('error, ', error)
      })
    
    // .then(
    //   (success: string) => {
    //     this.loginForm.reset();
    //     this.toastrService.success('Welcome back!', 'Đăng nhập thành công');
    //     setTimeout(() => {
    //       this.router.navigate(['/nhap-lieu']);
    //     }, 500);       
    //   }
    // ).catch(
    //   (error: string) => this.toastrService.error(error, 'Opps!')
    // );
  }

}

