import { Component, inject } from '@angular/core';
import { Auth } from '../auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private toastr = inject(ToastrService);
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  showPassword = false;
  hasError = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.hasError = true;
      return;
    }

    this.hasError = false;
    const username = this.loginForm.get('username')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    console.log('Attempting login with:', { username, password });

    this.authService.login(username, password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.toastr.success('Login successful!');
        } else {
          this.toastr.error('Invalid username or password. Please try again.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      },
      error: () => {
        this.toastr.error('Login failed. Please try again later.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      },
    });
  }
}
