# Spécification du Mock Backend

## 1. Finalité

Le Mock Backend permet de développer et démontrer les écrans, parcours et règles métier avant la disponibilité du serveur réel.

Il simule des opérations asynchrones et des réponses de données. Il ne constitue ni une API serveur, ni un système d'authentification sûr, ni un dispositif de conservation des données personnelles.

## 2. Règles impératives

- Toutes les données seed doivent être fictives.
- L'interface doit afficher un bandeau « Mode démonstration — données fictives » dans les parcours Pool et administration.
- Ne pas utiliser ce mode pour les inscriptions réelles.
- Ne pas collecter de vrais CV ou portfolios.
- Ne pas générer de vraies notifications, e-mails ou SMS.
- Ne pas exposer de secrets : un mock côté navigateur ne peut en protéger aucun.
- Les exports ne doivent contenir que des données fictives.
- Les données locales doivent pouvoir être réinitialisées.
- La démo ne doit pas prétendre être sécurisée ou conforme pour une collecte réelle.

## 3. Fonctionnalités simulées

### Public

- Affichage des activités et opportunités seed.
- État vide lorsque aucune opportunité n'est disponible.
- Validation du formulaire Pool.
- Simulation d'une confirmation après soumission.
- Aucun transfert à un serveur.

### Administration

- Connexion fictive avec accès de démonstration clairement indiqué.
- Liste des talents seed.
- Recherche textuelle.
- Filtres combinables.
- Consultation d'une fiche.
- Mise à jour du statut.
- Export CSV/XLSX.
- Réinitialisation du jeu de démonstration.

### Appels à candidatures

- Création et affichage de formulaires simulés.
- Critères, dates et champs stockés localement.
- Soumission simulée.
- Pas de candidature réelle ni de notification réelle.

## 4. Comportement asynchrone

Les repositories simulés doivent retourner des promesses ou observables asynchrones afin que l'interface soit identique à celle d'un backend futur.

Ajouter des scénarios contrôlables :

- latence normale ;
- latence élevée ;
- erreur serveur simulée ;
- aucun résultat ;
- données invalides ;
- conflit de mise à jour.

L'interface doit afficher des états de chargement, erreur, vide et succès.

## 5. Données de démonstration

Prévoir un seed avec des profils inventés et clairement identifiés comme tels. Utiliser des noms, coordonnées et adresses de test qui ne correspondent pas à des personnes réelles. Les numéros et adresses e-mail doivent être non routables ou explicitement fictifs.

Prévoir plusieurs profils couvrant :
- Yaoundé, Douala et autre ville ;
- étudiant, jeune diplômé, entrepreneur et autre ;
- plusieurs domaines d'intérêt ;
- les différents statuts.

Ne pas construire les données seed en copiant les coordonnées de candidats ou d'individus réels.

## 6. Stockage

### Mémoire

À privilégier pour les tests et démonstrations temporaires.

### LocalStorage

Acceptable uniquement pour des données de démonstration fictives et non sensibles. Ajouter :

- clé avec namespace ;
- version du schéma ;
- gestion des erreurs d'accès ;
- réinitialisation ;
- migration locale simple si le schéma évolue.

### IndexedDB

À envisager seulement si un volume de données de démonstration ou un besoin offline justifie sa complexité.

Ne pas sauvegarder de CV/portfolio ou de données personnelles réelles dans le navigateur.

## 7. Contrat avec le futur backend

Les interfaces de repositories constituent le contrat de migration. Les modèles UI ne doivent pas dépendre du format interne des réponses serveur.

À l'arrivée du backend :
1. définir DTO et contrat API ;
2. implémenter les repositories HTTP ;
3. ajouter authentification et autorisation côté serveur ;
4. ajouter validation et contrôles serveur ;
5. remplacer le provider mock ;
6. adapter tests et environnements ;
7. désactiver le mode mock en production ;
8. vérifier qu'aucune donnée seed ne peut être prise pour une donnée réelle.

## 8. Règle de build

Créer une vérification de configuration empêchant un build destiné à la collecte réelle de démarrer avec `MOCK_MODE=true`. Si une démo publique doit être hébergée, elle doit être explicitement nommée et séparée de la future production de collecte.
