import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthDemoService } from '../../../core/services/auth-demo.service';

@Component({
  selector: 'app-admin-auth-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <div class="auth-box card">
        <div class="auth-badge">ESPACE ÉQUIPE PROJET</div>
        <h1>Connexion de démonstration</h1>
        <p class="auth-desc">
          Cet espace est destiné à l'équipe de pilotage pour simuler la consultation du Pool de talents, 
          le tri des candidatures et le suivi des indicateurs.
        </p>

        <div class="demo-warning" role="alert">
          <strong>Avertissement sécurité :</strong>
          Il s'agit d'une simulation d'accès frontend. Aucune authentification serveur robuste 
          n'est implémentée à ce stade. Ne pas utiliser ce mode pour une exploitation réelle.
        </div>

        <div class="auth-actions">
          <button type="button" class="btn btn-primary btn-lg" (click)="onLogin()">
            Entrer dans l'espace d'administration démo →
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 4rem 1.5rem;
      display: flex;
      justify-content: center;
    }
    .auth-box {
      max-width: 520px;
      width: 100%;
      padding: 3rem 2.5rem;
      text-align: center;
    }
    .auth-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      background-color: var(--color-primary-light);
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .auth-box h1 {
      font-size: 1.85rem;
      margin-bottom: 0.75rem;
    }
    .auth-desc {
      color: var(--color-text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .demo-warning {
      background-color: var(--color-demo-banner-bg);
      border: 1px solid #fde68a;
      color: var(--color-demo-banner);
      font-size: 0.85rem;
      padding: 1rem;
      border-radius: var(--radius-md);
      margin-bottom: 2rem;
      text-align: left;
    }
    .auth-actions {
      display: flex;
      justify-content: center;
    }
    .auth-actions .btn {
      width: 100%;
    }
  `]
})
export class AdminAuthDemoComponent {
  private readonly auth = inject(AuthDemoService);
  private readonly router = inject(Router);

  onLogin(): void {
    this.auth.loginDemo();
    this.router.navigate(['/admin']);
  }
}
