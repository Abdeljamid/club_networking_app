import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Membres du club</h2>

    <div
      *ngFor="let member of members"
      style="
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    gap: 1rem;
  "
    >
      <img
        *ngIf="member.profile_picture"
        [src]="'http://localhost:3000/uploads/' + member.profile_picture"
        alt="Photo de {{ member.first_name }}"
        style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; border: 2px solid #76B947;"
      />

      <div>
        <h3 style="margin: 0;">
          {{ member.first_name }} {{ member.last_name }}
        </h3>
        <p style="margin: 0.2rem 0;">
          <strong>Entreprise :</strong>
          {{ member.company_name || 'Non renseigné' }}<br />
          <strong>Secteur :</strong>
          {{ member.company_sector || 'Non renseigné' }}
        </p>
        <p style="font-style: italic; color: #555;">
          {{ member.bio || 'Aucune bio disponible.' }}
        </p>

        <a
          *ngIf="member.linkedin_url"
          [href]="member.linkedin_url"
          target="_blank"
          style="color: #0a66c2; text-decoration: none; font-weight: bold;"
        >
          🔗 Voir le LinkedIn
        </a>
      </div>
    </div>
  `,
})
export class MembersComponent implements OnInit {
  members: any[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.getMembers().subscribe((res) => {
      this.members = res;
    });
  }
}
