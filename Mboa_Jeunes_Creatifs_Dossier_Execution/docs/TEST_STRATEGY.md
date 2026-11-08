# Stratégie de tests — Mboa Jeunes Créatifs

## 1. Principes

- Tester les règles métier avant les détails d'implémentation.
- Tester tous les parcours principaux et états d'erreur.
- Utiliser des données fictives.
- Ne jamais exécuter de tests de soumission sur de véritables données.
- Conserver les rapports d'exécution.
- Ne pas modifier les tests pour masquer une anomalie.

## 2. Tests unitaires

Couvrir :
- calculateurs d'âge, avec date de référence injectée ;
- validateurs des formulaires ;
- règles de statut ;
- filtres et recherche ;
- mapping modèles / DTO ;
- repositories mock ;
- export des colonnes autorisées ;
- validation de configuration mock.

La règle d'âge doit accepter une date de référence explicite. Ne pas coder une limite universelle de moins de 35 ans pour tous les appels : les critères peuvent varier par activité.

## 3. Tests composants

Tester :
- navigation responsive ;
- formulaire Pool et messages d'erreur ;
- composants de filtres ;
- tableau et fiche de profil ;
- états chargement, vide, erreur, succès ;
- dialogues de confirmation ;
- bannière de mode démo ;
- consentement et préférences cookies si implémentés.

## 4. Tests d'intégration

Vérifier :
- service métier vers repository mock ;
- création d'un profil fictif ;
- persistance locale du mock ;
- réinitialisation ;
- changement de statut ;
- filtres combinés ;
- export limité aux résultats fictifs ;
- séparation du modèle Pool et des candidatures.

## 5. Tests E2E

Parcours à automatiser :
1. accueil → activités → opportunités ;
2. accueil → communauté → validation du formulaire de démonstration ;
3. connexion démo → liste talents → recherche → filtres → fiche ;
4. changement de statut → export CSV/XLSX ;
5. réinitialisation du mock ;
6. navigation clavier sur les formulaires et le menu.

## 6. Sécurité frontend

Vérifier :
- absence de clés ou secrets dans les bundles ;
- absence de données réelles dans les seeds ;
- bandeau de démonstration visible ;
- route admin non présentée comme une protection de données ;
- build de collecte réelle refusé si le mode mock est activé ;
- aucun vrai CV enregistré ;
- aucun tracker non essentiel exécuté avant consentement requis.

Rappel : les contrôles du frontend ne remplacent pas les protections du backend.

## 7. Accessibilité et compatibilité

Tester :
- navigation clavier ;
- focus visible ;
- contraste ;
- structure des titres ;
- labels et erreurs des formulaires ;
- lecteur d'écran sur les principaux parcours ;
- viewport mobile, tablette et desktop ;
- navigateurs récents ciblés.

## 8. Rapports obligatoires

Pour chaque campagne de tests, consigner :
- date et commit ;
- versions d'outils ;
- commande exécutée ;
- nombre de tests réussis/échoués/ignorés ;
- anomalies ;
- limites de couverture ;
- décision de validation.

Aucun résultat ne doit être annoncé sans exécution réelle.
