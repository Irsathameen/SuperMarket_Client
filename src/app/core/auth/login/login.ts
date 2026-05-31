import { Component, inject } from '@angular/core';
import { Auth } from '../auth';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
private toastr = inject(ToastrService);
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (!username || !password) {
   

           this.toastr.error('Please enter username and password.', 'Error', {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  progressBar: true
});
      return;
    }

    this.authService.login(username, password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.toastr.success('Login successful!');
        } else {
          alert('Invalid username or password. Please try again.');
        }
      },
      error: () => {
        alert('Login failed. Please try again later.');
      }
    });
  }
}
