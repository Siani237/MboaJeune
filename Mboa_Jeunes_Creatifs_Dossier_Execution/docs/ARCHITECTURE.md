# Architecture cible — Angular + Mock Backend

## 1. Principe général

Le projet est une application Angular côté client. Il n'existe pas de backend réel dans cette phase.

L'architecture doit séparer :

- présentation ;
- cas d'usage / logique métier ;
- modèles et contrats ;
- accès aux données.

Les composants ne doivent pas appeler directement `localStorage`, contenir des données fictives métier ou gérer la persistance.

## 2. Architecture logique

```text
Angular UI
  ├── Public pages
  ├── Talent pool pages
  └── Admin demo pages
          |
          v
Application services / use cases
          |
          v
Domain models + repository contracts
          |
          v
Repository implementations
  ├── Mock repositories (maintenant)
  └── HTTP repositories (plus tard)
          |
          v
Mock store (memory + local persistence)
```

Le futur backend sera une API distante. Le remplacement portera principalement sur les implémentations des repositories et la configuration d'injection, pas sur les composants.

## 3. Structure de dossiers proposée

Adapter cette structure au projet réel après audit ; ne pas déplacer aveuglément un dépôt existant.

```text
src/
  app/
    core/
      config/
      guards/
      interceptors/
      layout/
      services/
    shared/
      components/
      directives/
      pipes/
      validators/
    features/
      home/
      about/
      activities/
      opportunities/
      news/
      testimonials/
      faq/
      contact/
      talent-pool/
        public-form/
        models/
        data-access/
        application/
      admin/
        auth-demo/
        dashboard/
        talents/
        applications/
        settings/
    domain/
      models/
      repositories/
      value-objects/
    data-access/
      mock/
        seed/
        repositories/
        mock-store/
      api/
        repositories/
        dto/
    app.routes.ts
    app.config.ts
  assets/
    images/
    icons/
    fonts/
  environments/
```

## 4. Routes proposées

| Route | Accès | Description |
|---|---|---|
| `/` | Public | Accueil |
| `/programme` | Public | À propos / présentation |
| `/activites` | Public | Domaines et activités |
| `/opportunites` | Public | Agenda et appels ouverts |
| `/actualites` | Public | Liste d'actualités |
| `/actualites/:slug` | Public | Détail d'article |
| `/temoignages` | Public | Expériences validées ou état vide |
| `/faq` | Public | Questions fréquentes |
| `/contact` | Public | Contact |
| `/communaute` | Public | Présentation du Pool et inscription de démonstration |
| `/admin/demo-login` | Démo | Connexion fictive |
| `/admin` | Démo | Tableau de bord |
| `/admin/talents` | Démo | Liste, recherche et filtres |
| `/admin/talents/:id` | Démo | Détail d'un profil fictif |
| `/admin/appels` | Démo | Appels à candidatures simulés |
| `/mentions-legales` | Public | Brouillon juridique à valider |
| `/confidentialite` | Public | Brouillon à valider |
| `/cookies` | Public | Politique cookies à valider |
| `/conditions-utilisation` | Public | CGU à valider si nécessaires |

La protection des routes admin dans le frontend ne constitue pas une sécurité de données. Elle ne sert qu'à organiser une démonstration.

## 5. Modèles métier de départ

### TalentProfile

```ts
export type TalentStatus =
  | 'new'
  | 'to_review'
  | 'pending'
  | 'selected';

export interface ConsentRecord {
  granted: boolean;
  noticeVersion: string;
  acceptedAt: string; // ISO 8601 — simulation uniquement en mode mock
}

export interface TalentProfile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  city: 'Yaounde' | 'Douala' | 'Other';
  cityOther?: string;
  currentSituation: 'student' | 'graduate' | 'entrepreneur' | 'other';
  currentSituationOther?: string;
  educationLevel: string;
  background: string;
  interests: string[];
  skillsAndExperience: string;
  motivation: string;
  learningGoals?: string;
  availability: string;
  status: TalentStatus;
  consent: ConsentRecord;
  createdAt: string;
  updatedAt: string;
}
```

Les valeurs exactes, notamment les niveaux d'études, villes, disponibilité et statuts, devront être confirmées avec le responsable métier. Ne stocker aucune vraie donnée dans les implémentations mock.

### Activity / Opportunity

Prévoir une entité structurée avec :

- `id`, `slug`, `title`, `summary`, `description` ;
- `domain`, `city`, `venue` ;
- `startDate`, `endDate` ;
- `registrationStatus`, `registrationUrl` ;
- `eligibilityRules`, `capacity` si confirmé ;
- `status` (draft, published, closed) ;
- `lastUpdatedAt`.

Ne pas créer des dates ou modalités fictives qui pourraient être interprétées comme une programmation officielle.

### NewsArticle

Prévoir titre, slug, résumé, contenu, date, image facultative, auteur et état de publication. Les données de seed seront explicitement fictives ou de démonstration.

### ApplicationCall et ApplicationSubmission

Distinguer impérativement :

- le profil permanent dans le Pool ;
- l'appel à candidatures ;
- la candidature d'une personne à un appel précis.

Une inscription au Pool ne crée pas automatiquement une candidature. Chaque appel possède ses propres critères, échéances, pièces demandées et réponses.

## 6. Contrats de repositories

Les services métier doivent dépendre d'interfaces, pas de la classe mock.

Exemple indicatif :

```ts
export interface TalentQuery {
  search?: string;
  city?: string;
  interest?: string;
  situation?: string;
  status?: string;
}

export interface TalentRepository {
  list(query?: TalentQuery): Promise<TalentProfile[]>;
  getById(id: string): Promise<TalentProfile | null>;
  create(input: CreateTalentProfileInput): Promise<TalentProfile>;
  updateStatus(id: string, status: TalentStatus): Promise<TalentProfile>;
  export(query?: TalentQuery): Promise<TalentProfile[]>;
}
```

Définir un `InjectionToken<TalentRepository>` et fournir `MockTalentRepository` pour la démo. Plus tard, fournir `HttpTalentRepository` qui utilise `HttpClient`, DTO et mapping. Ne pas placer les URLs d'API ou la logique HTTP dans les composants.

## 7. Gestion du Mock Store

- Utiliser un jeu de données de démonstration fictif.
- Ajouter un préfixe de clé spécifique, par exemple `mjc-demo:` pour éviter les collisions.
- Versionner le schéma de stockage local.
- Fournir une action « réinitialiser les données de démonstration ».
- Simuler délais, erreurs et états vides pour tester les interfaces.
- Ne jamais importer les vrais fichiers ou profils d'un utilisateur dans le jeu de démonstration.
- Éviter de persister des fichiers binaires dans LocalStorage.
- Rappeler dans l'interface que les données peuvent être effacées et ne sont pas partagées entre appareils.

## 8. Points Angular

- Utiliser des composants standalone et une structure feature-first.
- Activer TypeScript strict.
- Utiliser Angular Router et le lazy loading pour les features non nécessaires à l'accueil.
- Utiliser Reactive Forms pour les formulaires structurés.
- Utiliser Signals ou RxJS selon le besoin, sans multiplier les mécanismes d'état.
- Centraliser la configuration des providers.
- Ajouter une gestion uniforme des erreurs.
- Garder les composants petits et orientés présentation.
- Écrire des tests pour services, validators, repositories et parcours.

## 9. SEO

Pour les pages publiques, évaluer le besoin de prerender ou SSR Angular selon l'hébergement, les contenus et les objectifs d'indexation. Les pages admin et données privées doivent rester non indexables. Ne pas choisir une stratégie SEO sans vérifier le mode de déploiement réel.

## 10. Migration vers un backend réel

Le passage au backend réel devra ajouter :

- endpoints documentés ;
- authentification serveur ;
- autorisation RBAC ;
- base de données ;
- validation serveur ;
- stockage privé de fichiers ;
- journaux d'audit ;
- limitation de débit ;
- consentement enregistré côté serveur ;
- sauvegardes et procédure de restauration.

Les composants publics et admin consommeront toujours les mêmes services applicatifs. Le provider de repository basculera vers l'implémentation API après tests de contrat.
