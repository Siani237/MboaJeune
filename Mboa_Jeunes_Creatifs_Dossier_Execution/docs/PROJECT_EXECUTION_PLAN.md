# Plan d'exécution — Mboa Jeunes Créatifs

**Statut initial :** cadrage établi — développement non commencé faute de dépôt Angular fourni.  
**Technologie :** Angular + Mock Backend.  
**Objectif :** livrer une démonstration fonctionnelle du site vitrine et du Pool de talents, préparée pour un futur backend réel.

## 1. Objectif produit

Construire une plateforme web accessible et responsive pour :

1. présenter le programme Mboa Jeunes Créatifs ;
2. informer les jeunes sur ses domaines, activités et opportunités ;
3. orienter les visiteurs vers les modalités officielles de participation ;
4. permettre une démonstration du parcours d'inscription au Pool de talents ;
5. permettre à l'équipe de simuler la consultation, le filtrage, le suivi et l'export de profils fictifs ;
6. préparer les futurs formulaires d'appels à candidatures spécifiques.

Le site est destiné principalement aux jeunes de moins de 35 ans, notamment aux étudiants et aux jeunes intéressés par les industries culturelles et créatives. Le programme a été lancé à Yaoundé et à Douala. Les domaines mentionnés dans le dossier sont la mode, la musique, la radio et les médias, le numérique, les arts visuels, le sport et l'événementiel.

## 2. Décisions fonctionnelles et techniques

| Sujet | Décision de la première version |
|---|---|
| Frontend | Angular standalone + TypeScript strict |
| Backend | Aucun backend réel |
| Simulation | Repositories simulés injectés via des contrats |
| Persistance mock | Mémoire et stockage local pour données fictives uniquement |
| Utilisateurs publics | Parcours de démonstration, avertissement explicite |
| Administration | Espace de démonstration, authentification fictive |
| CV / portfolio | Pas de stockage ni transmission réelle ; interface désactivée ou démonstration sans fichier personnel |
| Candidatures | Maquette fonctionnelle simulée, sans dépôt réel |
| Exports | CSV/XLSX de profils fictifs uniquement |
| SEO | Pages publiques structurées ; prévoir prerender/SSR selon hébergeur et besoin d'indexation |
| Déploiement | Démonstration/recette uniquement tant que le backend réel n'existe pas |

## 3. Périmètre de la première version

### Inclus

- Accueil.
- Présentation du programme.
- Activités et domaines.
- Opportunités / agenda.
- Actualités.
- Témoignages (état vide tant qu'aucun témoignage validé n'est fourni).
- FAQ.
- Contact.
- Page « Rejoindre la communauté » en mode démonstration.
- Espace d'administration simulé du Pool.
- Recherche, filtres, fiche profil et changement de statut sur profils fictifs.
- Export CSV/XLSX de données fictives.
- Préparation de la structure des appels à candidatures.
- Pages institutionnelles et de confidentialité avec contenus provisoires clairement identifiés comme à valider.
- Bannière/gestion de préférences cookies si des traceurs sont effectivement utilisés ; aucun traceur non essentiel ne doit être ajouté par défaut.

### Hors périmètre de production à ce stade

- Collecte et stockage de véritables profils.
- Authentification et autorisation réelles.
- Envoi d'e-mails ou de SMS.
- Upload et conservation de CV/portfolios.
- Base de données distante.
- Gestion réelle des candidatures.
- Exports de données personnelles réelles.
- Publication d'activités, articles ou témoignages non validés.
- QR code utilisé pour une collecte réelle.

## 4. Phases et tâches

Les identifiants ci-dessous servent au suivi. Une tâche ne passe à `TERMINÉ` qu'après vérification de ses critères d'acceptation.

### Phase 0 — Préparation et audit du dépôt

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-000 | Obtenir/ouvrir le dépôt Angular | Aucune | Répertoire source accessible et branche de travail créée | À FAIRE |
| MJC-001 | Auditer Angular, Node, npm, dépendances et scripts | MJC-000 | Versions et commandes documentées | À FAIRE |
| MJC-002 | Examiner le code, les pages et tests existants | MJC-000 | Inventaire des modules et risques de régression | À FAIRE |
| MJC-003 | Créer branche de travail et baseline Git | MJC-000 | État initial sauvegardé, build et tests de référence connus | À FAIRE |

### Phase 1 — Cadrage et exigences

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-010 | Formaliser les rôles et parcours | Aucune | Visiteur, jeune inscrit, administrateur et éditeur décrits | À FAIRE |
| MJC-011 | Définir les exigences fonctionnelles | MJC-010 | Chaque fonction possède un identifiant et une priorité | À FAIRE |
| MJC-012 | Définir les exigences non fonctionnelles | MJC-010 | Sécurité, accessibilité, performance, SEO et maintenance documentés | À FAIRE |
| MJC-013 | Clarifier les statuts du Pool | MJC-010 | Sens métier et transitions validés | À VALIDER |
| MJC-014 | Confirmer le traitement de l'âge | MJC-010 | Date de référence et règles d'éligibilité définies par activité | À VALIDER |
| MJC-015 | Confirmer contenu et coordonnées institutionnelles | Aucune | Textes, contacts et activités approuvés par l'IFC | À VALIDER |
| MJC-016 | Valider finalités, responsable, durée de conservation et consentement | Aucune | Instructions documentées par IFC / conseil juridique | À VALIDER |

### Phase 2 — Architecture et fondations Angular

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-020 | Créer ou stabiliser le projet Angular | MJC-000 | Projet démarre et compile | À FAIRE |
| MJC-021 | Activer TypeScript strict et conventions | MJC-020 | Configuration stricte et linting opérationnels | À FAIRE |
| MJC-022 | Organiser les domaines et couches | MJC-020 | Structure feature-first documentée | À FAIRE |
| MJC-023 | Définir les modèles et contrats de repositories | MJC-022 | Modèles typés et interfaces sans dépendance UI | À FAIRE |
| MJC-024 | Ajouter le routage public et privé | MJC-022 | Toutes les routes prévues ont un composant cible | À FAIRE |
| MJC-025 | Mettre en place gestion d'erreurs et états asynchrones | MJC-023 | Chargement, vide, erreur et succès démontrables | À FAIRE |
| MJC-026 | Configurer environnements et drapeau MOCK_MODE | MJC-020 | Mode mock explicite, visible et contrôlé | À FAIRE |

### Phase 3 — Direction artistique et Design System

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-030 | Collecter les références de marque IFC/MJC | MJC-015 | Logos, couleurs et règles d'usage disponibles ou absences documentées | À FAIRE |
| MJC-031 | Définir la direction artistique éditoriale | MJC-030 | Moodboard/règles validés | À FAIRE |
| MJC-032 | Définir tokens, typographie et grille | MJC-031 | Tokens centralisés et documentés | À FAIRE |
| MJC-033 | Créer composants de base | MJC-032 | Boutons, champs, navigation, alertes, tags, dialogues cohérents | À FAIRE |
| MJC-034 | Créer les gabarits de page | MJC-033 | Header, footer, conteneurs et layouts public/admin cohérents | À FAIRE |
| MJC-035 | Vérifier responsive et accessibilité | MJC-034 | Parcours principaux utilisables clavier et mobile | À FAIRE |

### Phase 4 — Site vitrine public

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-040 | Construire accueil | MJC-034 | Accroche, présentation et CTA validables | À FAIRE |
| MJC-041 | Construire page programme / à propos | MJC-034 | Contenu fidèle au dossier | À FAIRE |
| MJC-042 | Construire domaines et activités | MJC-034 | 7 domaines affichés sans inventer de programmation | À FAIRE |
| MJC-043 | Construire opportunités / agenda | MJC-034 | État vide informatif et fiches mock clairement identifiées | À FAIRE |
| MJC-044 | Construire actualités | MJC-034 | Aucune actualité fictive présentée comme réelle | À FAIRE |
| MJC-045 | Construire témoignages | MJC-034 | Aucun faux témoignage ; état vide prévu | À FAIRE |
| MJC-046 | Construire FAQ | MJC-034 | Questions du dossier reprises et réponses cohérentes | À FAIRE |
| MJC-047 | Construire contact | MJC-034 | Formulaire de démonstration et coordonnées en attente de validation | À FAIRE |
| MJC-048 | Construire pages légales et confidentialité | MJC-016 | Brouillons cohérents identifiés comme non validés | À FAIRE |
| MJC-049 | Mettre en place SEO, metadata et stratégie prerender | MJC-040 à 048 | Pages publiques correctement configurées | À FAIRE |

### Phase 5 — Pool de talents public

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-050 | Construire la page « Rejoindre la communauté » | MJC-034 | Présentation et consignes de démonstration visibles | À FAIRE |
| MJC-051 | Construire le formulaire typé | MJC-023, MJC-050 | Champs du dossier, validation claire et accessible | À FAIRE |
| MJC-052 | Ajouter consentement de démonstration | MJC-016, MJC-051 | Aucune collecte réelle ; version de texte affichée et avertissement | À FAIRE |
| MJC-053 | Simuler soumission et confirmation | MJC-051, MJC-023 | Profil fictif créé dans le mock store uniquement | À FAIRE |
| MJC-054 | Simuler la sélection d'un fichier sans stockage | MJC-051 | Aucun transfert ni conservation du CV | À FAIRE |

### Phase 6 — Administration du Pool

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-060 | Construire shell d'administration | MJC-034 | Navigation admin séparée du site public | À FAIRE |
| MJC-061 | Créer écran de connexion fictive | MJC-026 | Avertissement « démonstration » visible | À FAIRE |
| MJC-062 | Créer tableau de bord mock | MJC-060 | Indicateurs calculés à partir des profils fictifs | À FAIRE |
| MJC-063 | Créer liste et recherche | MJC-060 | Recherche par nom et pagination/chargement adapté | À FAIRE |
| MJC-064 | Ajouter filtres ville, domaine, situation, statut et âge | MJC-063 | Filtres combinables et réinitialisables | À FAIRE |
| MJC-065 | Créer fiche détail profil | MJC-063 | Données et consentement de démonstration visibles | À FAIRE |
| MJC-066 | Ajouter transitions de statut | MJC-065 | Historique mock et règles documentées | À FAIRE |
| MJC-067 | Ajouter export CSV/XLSX | MJC-063 | Export limité aux données fictives, colonnes maîtrisées | À FAIRE |
| MJC-068 | Préparer les appels à candidatures | MJC-023 | Modèle distinct du pool et formulaires mock | À FAIRE |

### Phase 7 — Tests, sécurité et qualité

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-070 | Tests unitaires modèles/services/validators | MJC-023 à 068 | Tests exécutés et rapport conservé | À FAIRE |
| MJC-071 | Tests composants et formulaires | MJC-040 à 068 | États et validations couverts | À FAIRE |
| MJC-072 | Tests E2E parcours visiteur et admin mock | MJC-040 à 068 | Parcours principaux automatisés | À FAIRE |
| MJC-073 | Audit accessibilité | MJC-035, 040 à 068 | Anomalies documentées et corrigées selon priorité | À FAIRE |
| MJC-074 | Audit dépendances et configuration frontend | MJC-020 | Aucun secret embarqué ; dépendances contrôlées | À FAIRE |
| MJC-075 | Audit séparation données mock / données réelles | MJC-026, 053, 067 | Aucun parcours ne fait croire à une collecte sécurisée | À FAIRE |
| MJC-076 | Audit responsive et navigateurs | MJC-040 à 068 | Formats cibles testés | À FAIRE |

### Phase 8 — Livraison de démonstration

| ID | Tâche | Dépendance | Critère d'acceptation | Statut |
|---|---|---|---|---|
| MJC-080 | Préparer build de démonstration | MJC-070 à 076 | Build reproductible et mode mock visible | À FAIRE |
| MJC-081 | Déployer en environnement de recette | MJC-080 | URL testable, pas de collecte réelle | À FAIRE |
| MJC-082 | Réaliser recette métier IFC | MJC-081, MJC-015, MJC-016 | Retours et arbitrages consignés | À VALIDER |
| MJC-083 | Produire documentation utilisateur et technique | MJC-020 à 082 | Guides de prise en main et de reprise disponibles | À FAIRE |
| MJC-084 | Préparer backlog backend réel | MJC-023, 053, 068, 075 | Contrats API et migrations nécessaires décrits | À FAIRE |

## 5. Critères de sortie de la version démo

La démo peut être présentée lorsque :

- les pages publiques principales fonctionnent ;
- le design est cohérent sur mobile et desktop ;
- les contenus non validés sont signalés en interne et non présentés comme des faits définitifs ;
- le Pool peut être parcouru avec des données exclusivement fictives ;
- les filtres, statuts et exports fonctionnent sur ces données ;
- aucun CV réel n'est téléversé ou conservé ;
- les tests principaux sont exécutés ;
- la démonstration affiche clairement qu'il ne s'agit pas d'un système de collecte réelle.

## 6. Conditions de passage au backend réel

Avant le lancement réel, il faudra développer et auditer :

- API sécurisée et base de données ;
- authentification admin réelle et comptes nominatifs ;
- autorisation par rôles et journalisation d'audit ;
- validation serveur de toutes les données ;
- gestion du consentement et de sa preuve côté serveur ;
- procédure d'exercice des droits ;
- conservation, purge et export contrôlés ;
- stockage privé des CV avec analyse des fichiers, contrôle d'accès et liens temporaires ;
- protection contre l'abus, rate limiting, sauvegardes et restauration ;
- notifications transactionnelles ;
- tests de sécurité et recette juridique ;
- migration des données mock : ne migrer aucune donnée de démonstration comme donnée réelle.

## 7. Blocages et validations humaines

Les points suivants ne doivent pas être inventés par le développeur :

1. validation officielle des textes et de l'accroche ;
2. coordonnées et comptes sociaux définitifs ;
3. activités réellement disponibles, dates, lieux et modalités ;
4. statut et transition exacte des profils du Pool ;
5. règles d'âge par activité et date à laquelle l'âge est calculé ;
6. responsable du traitement, finalités, base légale, destinataires et durée de conservation ;
7. libellés juridiques et procédure de contact pour les droits ;
8. identité visuelle et autorisation d'utilisation des logos/photos ;
9. validation du déploiement et de l'hébergement par le responsable du projet.

## 8. Règle de reprise par l'agent

À chaque session, l'agent doit relire ce plan, vérifier le dépôt et les livrables existants, mettre à jour les statuts et reprendre la première tâche non bloquée. Les annonces de sessions précédentes ne remplacent pas la vérification de l'état réel du code.
