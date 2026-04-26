import { Injectable, signal } from '@angular/core';

export interface User {
  fullName: string;
  email: string;
}

const STORAGE_KEY = 'elite_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userSignal = signal<User | null>(this.loadUser());

  readonly user = this.userSignal.asReadonly();

  login(email: string): void {
    const user = { fullName: 'Demo User', email };
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  register(fullName: string, email: string): void {
    const user = { fullName, email };
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadUser(): User | null {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  }
}