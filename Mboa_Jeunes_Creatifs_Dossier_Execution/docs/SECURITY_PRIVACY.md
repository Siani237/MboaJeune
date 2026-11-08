# Sécurité, confidentialité et conformité — Mboa Jeunes Créatifs

## 1. État de la première version

La première version repose sur Angular et un Mock Backend exécuté dans le navigateur. Ce mode convient à une démonstration avec des données fictives, mais ne permet pas de protéger des profils réels.

Il n'existe pas de serveur pour appliquer de façon fiable l'authentification, l'autorisation, la validation serveur, le stockage privé des CV, l'audit ou les règles de conservation.

**Interdiction de traiter des données de candidats réels dans cette version.**

## 2. Données concernées

Le dossier prévoit notamment :
- nom et prénoms ;
- date de naissance ;
- e-mail et téléphone/WhatsApp ;
- ville ;
- situation actuelle et niveau d'études ;
- parcours académique ou professionnel ;
- domaines d'intérêt ;
- compétences et expériences ;
- motivations et objectifs d'apprentissage ;
- disponibilité ;
- CV ou portfolio facultatif.

Ces informations sont personnelles. Les champs libres peuvent également contenir des informations non anticipées. Il faut limiter les données collectées au nécessaire et encadrer leur accès.

## 3. Contrôles possibles côté Angular pour une démo

- validation UX des champs ;
- messages d'erreur accessibles ;
- contrôle de taille/type de fichier en démonstration, sans transfert ;
- affichage d'un avertissement de mode démonstration ;
- profils seed fictifs ;
- routes organisées par rôle pour la navigation démo ;
- pas de secret dans le code ;
- pas de tracker non essentiel installé par défaut ;
- possibilité de réinitialiser les données fictives.

Ces contrôles ne constituent pas une sécurité serveur.

## 4. Contrôles obligatoires avec le futur backend

- authentification serveur robuste ;
- comptes admin nominatifs ;
- MFA pour administrateurs selon le risque ;
- autorisation et moindre privilège ;
- validation serveur de toutes les entrées ;
- rate limiting et protection contre les abus ;
- journaux d'audit des consultations et modifications sensibles ;
- transport HTTPS ;
- stockage privé des pièces jointes ;
- vérification antivirus / analyse des fichiers ;
- noms de fichiers aléatoires et stockage hors accès public direct ;
- liens de téléchargement temporaires, contrôles d'accès ;
- sauvegardes chiffrées et tests de restauration ;
- politique de conservation et purge ;
- procédure d'exercice des droits ;
- gestion des incidents et violations ;
- contrôle des sous-traitants et lieux d'hébergement.

## 5. Consentement et information

Le dossier exige un consentement explicite avant la soumission. Avant le lancement réel, l'IFC devra confirmer :

- responsable du traitement ;
- finalités précises ;
- base légale ;
- caractère obligatoire ou facultatif de chaque donnée ;
- destinataires ;
- durée de conservation ;
- contact pour les demandes ;
- éventuels transferts à l'étranger ;
- version du texte d'information ;
- modalités de retrait du consentement lorsque pertinent.

La preuve réelle du consentement devra être créée et horodatée côté serveur. L'horodatage généré par le navigateur ne constitue pas une preuve fiable.

En mode mock, afficher un texte de démonstration et avertir de ne saisir aucune donnée réelle.

## 6. Loi applicable

Le dossier cite la loi camerounaise n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel. Le texte officiel est référencé sur le site de la Présidence de la République du Cameroun : https://www.prc.cm/fr/actualites/actes/lois/7588

L'applicabilité précise, les formalités, les bases légales, les transferts, les délais et les documents à publier doivent être examinés par l'IFC et son conseil juridique. Ne pas déduire que l'ajout d'une case à cocher suffit à établir la conformité.

Le RGPD ne doit être appliqué que si son champ territorial ou matériel concerne effectivement le traitement.

## 7. Cookies et traceurs

- Ne pas installer d'analytics ou pixels publicitaires par défaut.
- Les cookies strictement nécessaires doivent être identifiés.
- Les traceurs non essentiels doivent rester bloqués tant que le consentement requis n'a pas été obtenu.
- Refuser doit être aussi accessible qu'accepter lorsque le droit applicable l'exige.
- Prévoir modification/retrait du choix lorsque nécessaire.
- Documenter chaque fournisseur, finalité, durée et transfert éventuel.

La bannière seule n'est pas une preuve de conformité : le déclenchement réel des scripts doit respecter le choix.

## 8. Pages juridiques à préparer

Selon le service et les obligations applicables :
- mentions légales ;
- politique de confidentialité ;
- politique cookies ;
- CGU ;
- CGV si transaction commerciale ;
- politique de conservation et suppression ;
- informations relatives aux droits ;
- règles de modération/signalement si contenu utilisateur ;
- propriété intellectuelle ;
- conditions de participation aux appels à candidatures.

Les documents doivent correspondre au traitement réellement effectué. Ils restent des brouillons tant qu'ils ne sont pas validés.

## 9. Feu vert obligatoire avant collecte réelle

La collecte ne peut commencer qu'après :
1. backend et stockage privé opérationnels ;
2. contrôle d'accès et journalisation vérifiés ;
3. textes d'information validés ;
4. durée de conservation et procédure de purge paramétrées ;
5. procédure de demande d'accès/rectification/suppression prête ;
6. gestion du consentement testée ;
7. validation juridique et opérationnelle de l'IFC ;
8. tests sécurité et recette validés ;
9. consentement du responsable de la mise en production.
