import { Routes } from '@angular/router';
import { adminDemoGuard } from './core/guards/admin-demo.guard';

export const routes: Routes = [
  // Routes publiques vitrine
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Mboa Jeunes Créatifs — Institut français du Cameroun'
  },
  {
    path: 'programme',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'Le programme — Mboa Jeunes Créatifs'
  },
  {
    path: 'activites',
    loadComponent: () =>
      import('./features/activities/activities.component').then((m) => m.ActivitiesComponent),
    title: 'Les 7 Domaines — Mboa Jeunes Créatifs'
  },
  {
    path: 'opportunites',
    loadComponent: () =>
      import('./features/opportunities/opportunities.component').then((m) => m.OpportunitiesComponent),
    title: 'Agenda & Opportunités — Mboa Jeunes Créatifs'
  },
  {
    path: 'actualites',
    loadComponent: () =>
      import('./features/news/news.component').then((m) => m.NewsComponent),
    title: 'Actualités — Mboa Jeunes Créatifs'
  },
  {
    path: 'temoignages',
    loadComponent: () =>
      import('./features/testimonials/testimonials.component').then((m) => m.TestimonialsComponent),
    title: 'Témoignages — Mboa Jeunes Créatifs'
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/faq/faq.component').then((m) => m.FaqComponent),
    title: 'Foire Aux Questions — Mboa Jeunes Créatifs'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact & Orientation — Mboa Jeunes Créatifs'
  },

  // Pool de talents (public)
  {
    path: 'communaute',
    loadComponent: () =>
      import('./features/talent-pool/talent-pool-form.component').then((m) => m.TalentPoolFormComponent),
    title: 'Rejoindre le Pool de talents — Mboa Jeunes Créatifs'
  },
  {
    path: 'talents/candidater',
    redirectTo: 'communaute',
    pathMatch: 'full'
  },
  {
    path: 'candidater',
    redirectTo: 'communaute',
    pathMatch: 'full'
  },
  {
    path: 'experience',
    redirectTo: 'communaute',
    pathMatch: 'full'
  },

  // Espace d'administration / Équipe
  {
    path: 'admin/demo-login',
    loadComponent: () =>
      import('./features/admin/auth-demo/admin-auth-demo.component').then((m) => m.AdminAuthDemoComponent),
    title: 'Espace Équipe — Mboa Jeunes Créatifs'
  },
  {
    path: 'admin',
    canActivate: [adminDemoGuard],
    loadComponent: () =>
      import('./features/admin/dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
    title: 'Tableau de bord — Administration Mboa'
  },
  {
    path: 'admin/talents',
    canActivate: [adminDemoGuard],
    loadComponent: () =>
      import('./features/admin/talents/admin-talents-list.component').then((m) => m.AdminTalentsListComponent),
    title: 'Gestion des Talents — Administration Mboa'
  },
  {
    path: 'admin/talents/:id',
    canActivate: [adminDemoGuard],
    loadComponent: () =>
      import('./features/admin/talents/admin-talent-detail.component').then((m) => m.AdminTalentDetailComponent),
    title: 'Fiche Candidat — Administration Mboa'
  },
  {
    path: 'admin/appels',
    canActivate: [adminDemoGuard],
    loadComponent: () =>
      import('./features/admin/applications/admin-applications-demo.component').then((m) => m.AdminApplicationsDemoComponent),
    title: 'Appels à candidatures — Administration Mboa'
  },

  // Pages institutionnelles & légales
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./features/legal/legal.component').then((m) => m.LegalComponent),
    title: 'Mentions légales — Mboa Jeunes Créatifs'
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./features/legal/privacy.component').then((m) => m.PrivacyComponent),
    title: 'Politique de confidentialité — Mboa Jeunes Créatifs'
  },

  // Redirection par défaut
  {
    path: '**',
    redirectTo: ''
  }
];
