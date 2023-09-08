import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/login', credentials)
      .subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response['access_token']);
          localStorage.setItem('username', this.username);
          console.log('Login successful!', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }
}
