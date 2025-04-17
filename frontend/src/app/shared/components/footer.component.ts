import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer
      style="background-color: var(--kiwi-green-dark); padding: 1rem; color: white; text-align: center;"
    >
      &copy; 2025 Kiwi Club. Tous droits réservés.
    </footer>
  `,
})
export class FooterComponent {}
