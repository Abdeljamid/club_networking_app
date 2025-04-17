import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Événements à venir</h2>

    <div
      *ngFor="let event of events"
      style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;"
    >
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
      <p><strong>Date :</strong> {{ event.date | date : 'short' }}</p>
      <p *ngIf="event.location"><strong>Lieu :</strong> {{ event.location }}</p>
      <p *ngIf="event.organizer">
        <strong>Organisé par :</strong> {{ event.organizer }}
      </p>
    </div>
  `,
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
