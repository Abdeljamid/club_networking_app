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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: `
    <h2>Inscription</h2>
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      enctype="multipart/form-data"
    >
      <input formControlName="first_name" placeholder="Prénom" required />
      <input formControlName="last_name" placeholder="Nom" required />
      <input
        formControlName="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        formControlName="password"
        type="password"
        placeholder="Mot de passe"
        required
      />

      <input formControlName="phone" placeholder="Téléphone" />
      <input formControlName="company_name" placeholder="Entreprise" />
      <input
        formControlName="company_sector"
        placeholder="Secteur d’activité"
      />
      <textarea
        formControlName="bio"
        placeholder="Petite présentation..."
      ></textarea>

      <input formControlName="linkedin_url" placeholder="LinkedIn" />
      <input formControlName="website_url" placeholder="Site Web" />

      <!-- Champ image -->
      <label for="file">Photo de profil :</label>
      <input type="file" id="file" (change)="onFileSelected($event)" />

      <button type="submit">S'inscrire</button>
    </form>
  `,
})
export class RegisterComponent {
  form: FormGroup;
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = new FormData();

    // Ajoute tous les champs du formulaire
    const formValues = this.form.getRawValue();
    for (const key in formValues) {
      if (formValues[key]) {
        formData.append(key, formValues[key]);
      }
    }

    // Ajoute le fichier image si sélectionné
    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    // Envoi via AuthService
    this.auth.register(formData).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: () => alert('Erreur lors de l’inscription'),
    });
  }
}
