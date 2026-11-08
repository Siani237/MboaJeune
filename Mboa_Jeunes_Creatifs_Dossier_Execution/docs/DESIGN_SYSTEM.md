# Direction artistique et Design System — Mboa Jeunes Créatifs

## 1. Intention

Concevoir une identité numérique contemporaine qui reflète la jeunesse, les industries culturelles et créatives, l'énergie des initiatives locales et le sérieux du programme.

Le site doit ressembler à un travail éditorial et institutionnel sur mesure, pas à un template SaaS généré automatiquement.

## 2. Contraintes tirées du dossier

Le dossier indique que le programme dispose actuellement de très peu de photographies (2 à 3) et d'aucune banque vidéo. Il recommande donc de privilégier une mise en page textuelle soignée, des icônes et des éléments graphiques par domaine. Les images externes ne pourront être utilisées qu'avec une licence appropriée et documentée.

Conséquence : la direction artistique ne doit pas dépendre d'un grand hero vidéo, d'un carrousel d'images ou de photos artificielles.

## 3. Direction recommandée

- Approche éditoriale, typographique et culturelle.
- Titres expressifs avec une hiérarchie forte.
- Grilles structurées, avec quelques ruptures de rythme maîtrisées.
- Espaces blancs généreux, sans grands vides décoratifs.
- Illustrations simples et pictogrammes cohérents pour les sept domaines.
- Photos authentiques du programme quand elles sont disponibles et autorisées.
- Animations limitées aux transitions utiles et aux retours d'interaction.

## 4. Identité visuelle à valider

Ne pas inventer les couleurs officielles ni redessiner les logos de l'IFC ou du programme sans autorisation.

Étapes :
1. demander le logo officiel et les règles de marque ;
2. identifier les couleurs autorisées ;
3. confirmer les règles de co-branding IFC / Ambassade / Fonds Équipe France ;
4. construire les design tokens à partir des éléments approuvés ;
5. consigner les contrastes et variantes accessibles.

En attendant ces ressources, utiliser une palette provisoire neutre et documenter explicitement son caractère temporaire.

## 5. Règles anti-design générique IA

À éviter :
- dégradés décoratifs bleu-violet ;
- glassmorphism systématique ;
- cartes uniformément arrondies pour toutes les sections ;
- ombres fortes ;
- icônes de styles mélangés ;
- illustrations stock génériques sans lien avec le programme ;
- titres et boutons surdimensionnés ;
- animations omniprésentes ;
- compositions identiques d'une page à l'autre.

Chaque choix doit soutenir une intention éditoriale, une action ou la lisibilité.

## 6. Composants

Prévoir les composants partagés suivants :

- `SiteHeader`, `PrimaryNavigation`, `MobileNavigation`, `SiteFooter` ;
- `PageIntro`, `SectionHeading`, `Breadcrumbs` ;
- `PrimaryButton`, `SecondaryButton`, `TextLink` ;
- `FormField`, `FormError`, `CheckboxField`, `SelectField` ;
- `StatusBadge`, `Alert`, `Toast`, `ConfirmDialog` ;
- `EmptyState`, `LoadingState`, `ErrorState` ;
- `ActivityCard`, `OpportunityListItem`, `NewsArticlePreview` ;
- `TalentFilters`, `TalentTable`, `TalentProfileSummary`.

Ne pas créer tous les composants à l'avance sans usage identifié. Construire et extraire les composants au rythme des pages.

## 7. Responsive

- Navigation mobile simple.
- Les tableaux admin deviennent des listes/cartes lisibles sur petits écrans ou disposent d'un défilement contrôlé.
- Formulaires en une colonne sur mobile.
- Actions principales toujours visibles et compréhensibles.
- Pas d'information uniquement accessible au survol.
- Contrôles tactiles suffisamment grands.

## 8. Accessibilité

Viser WCAG 2.2 AA :
- contraste vérifié ;
- focus visible ;
- ordre de tabulation logique ;
- labels explicites ;
- erreurs annoncées clairement ;
- sémantique HTML correcte ;
- alternatives textuelles ;
- respect des préférences de mouvement.

## 9. Direction par page

- **Accueil :** proposition de valeur claire, accès direct aux activités et opportunités, présentation du programme.
- **À propos :** récit institutionnel concis, financement et implantation présentés selon les textes validés.
- **Activités :** sept domaines, chacun avec un langage visuel propre mais appartenant au même système.
- **Opportunités :** contenu utile et daté ; état vide explicite si aucune activité n'est ouverte.
- **Actualités :** mise en page éditoriale, pas de fausses publications.
- **Témoignages :** ne jamais fabriquer de citation ; afficher l'introduction et un état sans témoignage.
- **FAQ :** questions lisibles, accordéons accessibles si utilisés.
- **Contact :** coordonnées validées et formulaire fonctionnel uniquement dans son mode déclaré.
- **Pool :** ton accueillant, formulaire simple, consentement et explications visibles.
- **Administration :** interface dense mais claire, priorisant recherche, filtres et lecture rapide des profils.
