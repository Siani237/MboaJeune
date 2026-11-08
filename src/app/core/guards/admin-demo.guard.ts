import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthDemoService } from '../services/auth-demo.service';

/**
 * Guard de démonstration : organise la navigation vers l'espace d'administration fictif.
 * Note de sécurité : ce guard n'est qu'un guidage UX pour la démo, pas une barrière sécurisée.
 */
export const adminDemoGuard: CanActivateFn = () => {
  const auth = inject(AuthDemoService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/admin/demo-login');
};
