import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username?: string;

  constructor() {
    const user = localStorage.getItem('username');
    if (user) {
      this.username = user;
    }
  }

  getName() {
    return this.username ?? 'Guest';
  }
}
