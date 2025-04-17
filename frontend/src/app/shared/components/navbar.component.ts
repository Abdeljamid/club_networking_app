import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav
      style="background-color: var(--kiwi-green); padding: 1rem; color: white;"
    >
      <strong style="font-size: 1.2rem;">Kiwi Club</strong>
      <a
        routerLink="/home"
        style="margin-left: 2rem; color: white; text-decoration: none;"
        >Accueil</a
      >
      <a
        routerLink="/events"
        style="margin-left: 1rem; color: white; text-decoration: none;"
        >Événements</a
      >
      <a
        routerLink="/members"
        style="margin-left: 1rem; color: white; text-decoration: none;"
        >Membres</a
      >
      <a
        routerLink="/register"
        style="margin-left: 1rem; color: white; text-decoration: none;"
        >Inscription</a
      >
      <a
        routerLink="/profile"
        style="margin-left: 1rem; color: white; text-decoration: none;"
        >Profil</a
      >
      <a
        routerLink="/login"
        style="margin-left: 1rem; color: white; text-decoration: none;"
        >Connexion</a
      >
    </nav>
  `,
})
export class NavbarComponent {}
