import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
