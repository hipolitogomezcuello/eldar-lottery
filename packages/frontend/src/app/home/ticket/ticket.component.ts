import { Component, Input } from '@angular/core';
import { Ticket } from "../../types/types";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket: Ticket;
}
