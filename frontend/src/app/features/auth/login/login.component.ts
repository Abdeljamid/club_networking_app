import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: `
    <h2>Connexion</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input
        formControlName="email"
        placeholder="Email"
        type="email"
        required
      />
      <input
        formControlName="password"
        placeholder="Mot de passe"
        type="password"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  `,
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const credentials = this.form.getRawValue(); // ← garanti sans undefined/null
    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/profile']);
      },
      error: (err) => alert('Erreur de connexion'),
    });
  }
}
