import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { Ticket } from "../types/types";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tickets: Ticket[] = [];
  loading: boolean = false;
  addTicketMode: boolean = false
  addTicketNumbers: number[] = [];
  dateSelected: Date = new Date();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
      return
    }
    this.loadTickets();
  }

  loadTickets() {
    const accessToken = localStorage.getItem('access_token');
    this.loading = true;
    this.http.get('http://localhost:3000/tickets', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).subscribe(
      (response: any) => {
        this.tickets = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading tickets:', error);
        this.loading = false;
      });
  }

  enterAddTicketMode() {
    this.addTicketMode = true;
  }

  async addTicket() {
    this.loading = true;
    if (this.addTicketNumbers.some(n => n < 1 || n > 100) || this.addTicketNumbers.length !== 5 || this.addTicketNumbers.some((n, i) => this.addTicketNumbers.indexOf(n) !== i)) {
      alert('Invalid ticket numbers, please select 5 different numbers between 1 and 100')
      return;
    }
    const accessToken = localStorage.getItem('access_token');
    this.http.post('http://localhost:3000/tickets', {
      numbers: this.addTicketNumbers,
      date: this.dateSelected.toISOString().slice(0, 10),
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).subscribe( (response: any) => {
      this.tickets.push(response);
      this.loading = false;
      this.exitAddTicketMode();
    }, (error) => {
      alert(error.error.message);
      this.loading = false;
    });
  }

  exitAddTicketMode() {
    this.addTicketMode = false;
    this.addTicketNumbers = [];
    this.dateSelected = new Date();
  }
}
