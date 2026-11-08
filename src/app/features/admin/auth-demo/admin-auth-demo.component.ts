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
        <div class="auth-badge">INSTITUT FRANÇAIS DU CAMEROUN</div>
        <h1>Espace Équipe &amp; Pilotage</h1>
        <p class="auth-desc">
          Portail interne réservé à la coordination du programme Mboa Jeunes Créatifs
          pour la consultation du Pool de talents, la gestion des candidatures et le suivi des ateliers.
        </p>

        <div class="auth-actions">
          <button type="button" class="btn btn-primary btn-lg" (click)="onLogin()">
            <span>Accéder au tableau de bord</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 6rem 1.5rem;
      display: flex;
      justify-content: center;
    }
    .auth-box {
      max-width: 540px;
      width: 100%;
      padding: 3.5rem 3rem;
      text-align: center;
      background: var(--ink);
      color: var(--text-on-dark);
      border: 1px solid var(--line-dark);
      border-radius: var(--radius-leaf);
      box-shadow: 12px 12px 0 var(--orange);
    }
    .auth-badge {
      display: inline-block;
      font-size: .75rem;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--ink);
      background: var(--orange);
      padding: .35rem .9rem;
      border-radius: 999px;
      margin-bottom: 1.5rem;
    }
    .auth-box h1 {
      font-size: 2.1rem;
      color: var(--ochre);
      margin-bottom: 1rem;
    }
    .auth-desc {
      color: var(--text-on-dark-muted);
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
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
    this.auth.loginDemo('Coordination IFC');
    this.router.navigate(['/admin']);
  }
}
