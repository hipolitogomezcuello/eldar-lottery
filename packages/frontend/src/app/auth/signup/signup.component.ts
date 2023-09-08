import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/signup', credentials)
      .subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response['access_token']);
          localStorage.setItem('username', this.username);
          console.log('Sign Up successful!', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          alert(error.error.message)
          console.error('Sign Up error:', error);
        }
      );
  }
}
