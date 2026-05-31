import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

// ─── Hardcoded valid users ───────────────────────────────────────────────────
const VALID_USERS: Credentials[] = [
  { username: 'admin',   password: 'admin123'  },
  { username: 'student', password: 'pass123'   },
  { username: 'teacher', password: 'teach2024' }
];

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private readonly SESSION_KEY = 'hotel_user';

  /** Validates credentials against the hardcoded list and returns an Observable. */
  login(username: string, password: string): Observable<boolean> {
    const match = VALID_USERS.find(
      u => u.username === username.trim() && u.password === password
    );

    if (match) {
      // Store logged-in username in sessionStorage
      sessionStorage.setItem(this.SESSION_KEY, match.username);
      return of(true);
    }
    return of(false);
  }

  /** Clears the session. */
  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /** Returns true when a user is logged in. */
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  /** Returns the currently logged-in username, or null. */
  getCurrentUser(): string | null {
    return sessionStorage.getItem(this.SESSION_KEY);
  }
}
