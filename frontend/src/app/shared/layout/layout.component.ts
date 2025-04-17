import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/navbar.component';
import { FooterComponent } from '../shared/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main style="padding: 2rem; min-height: 80vh;">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent {
  constructor() {
    console.log('LayoutComponent loaded!');
  }
}