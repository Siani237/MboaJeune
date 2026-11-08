import { Injectable, signal } from '@angular/core';

export interface DemoUser {
  name: string;
  role: 'admin_demo';
  email: string;
}

const STORAGE_KEY_AUTH = 'mjc-demo:auth_state';

@Injectable({
  providedIn: 'root'
})
export class AuthDemoService {
  private readonly _currentUser = signal<DemoUser | null>(this.loadInitialUser());
  readonly currentUser = this._currentUser.asReadonly();

  private loadInitialUser(): DemoUser | null {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    const stored = window.sessionStorage.getItem(STORAGE_KEY_AUTH);
    return stored ? JSON.parse(stored) : null;
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  loginDemo(name: string = 'Équipe Projet IFC (Démo)'): void {
    const user: DemoUser = {
      name,
      role: 'admin_demo',
      email: 'equipe-demo@ifcameroun.com'
    };
    this._currentUser.set(user);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    }
  }

  logout(): void {
    this._currentUser.set(null);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }
}
