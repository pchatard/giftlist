# Roadmap

## Pages publiques
### Accueil

## Pages privées
### Ma liste, Ma liste partagée
- [x] ~~**[Liste]** Gestion du status de la liste => Créer un lien vers une page dédiée /app/lists/:id/settings~~
- [ ] **[Liste partagée]** Afficher les détails de la liste (propriétaire, échéance, etc)
- [x] ~~Connecter les boutons aux bonnes actions du store~~ :
    - [x] ~~**[Liste]** Favori / Pas favori~~
    - [x] ~~**[Liste]** Supprimer~~
    - [x] ~~**[Liste partagée]** Détails~~
    - [x] ~~**[Liste partagée]** Réserver~~
- [ ] Revoir le design des Gift en grid
- [ ] Connecter les boutons aux actions du store (vue grille)

### Mes listes, mes Listes partagées
- [x] ~~Connecter les options aux actions du stores :~~
    - [x] ~~**[Listes]** Modifier / Gérer la visibilité : Page dédiée /app/lists/:id/settings~~
    - [x] ~~**[Listes partagées]** Détails : Modal ou page dédiée~~
- [x] ~~**[Listes]** Supprimer : Modal de confirmation~~
- [x] ~~**[Listes]** Modal Supprimer : Connecter à l'action du store correspondante~~
- [x] ~~**[Listes]** CTA : Redirige vers la page de création de listes : /app/lists/new~~
- [x] ~~**[Listes partagées]** CTA : Ouvre un popup pour rentrer un nouveau code de partage~~

### Paramètres de la liste
- [ ] Créer des tabs : Général, Visibilité

### Nouvelle liste
- [x] ~~Créer la page~~
- [x] ~~CTA : Créer la liste (Retour vers la liste)~~
- [x] ~~Annuler~~
- [x] ~~Step 1~~
    - [x] ~~Informations générales de la liste : Nom*, description, échéance~~
    - [x] ~~CTA : Aller directement sur ma page liste -> visibilité privée par défault~~
    - [x] ~~CTA : Aller à l'étape 2~~
- [x] ~~Step 2~~
    - [x] ~~Options de partages et de visibilité : Ajouter directement des personnes, Option Liste Commune avec un ami, Rendre visible directement~~
    - [x] ~~CTA : Aller directement sur ma page liste -> cadeaux vides par défault~~
    - [x] ~~CTA : Aller à l'étape 3~~
- [x] ~~Connecter les actions du store~~

### Nouveau cadeau
- [x] ~~Créer la page~~
- [x] ~~Formulaire~~
- [x] ~~Champs : Titre*, lien, prix, marque, taille, couleur, type~~
- [ ] CTA : Créer le cadeau (Retour vers la liste)
- [ ] CTA : Ajouter un autre cadeau (Page d'ajout de cadeaux)
- [x] ~~Annuler~~

### Cadeau (Détail)
- [x] ~~Créer la page~~
- [ ] Formulaire pour modifier le cadeau
- [ ] CTA : Enregistrer les modifications
- [ ] CTA : Supprimer le cadeau

### Profil
- [ ] Afficher mes informations
- [ ] Modifier mon mot de passe (envoi de lien par email)
- [ ] RGPD : Télécharger mes données personnelles

### Préférences
- [x] ~~Stocker les préférences dans les metadatas Auth0~~
- [x] ~~Vue liste / grille~~
- [x] ~~Montrer aux autres que je réserve : on/off~~
- [ ] Nom apparent lors des réservations
- [ ] Gestion du thème sombre

## Général
### Fonctions générales
- [x] ~~Configurer Auth0~~~
- [x] Créer des datas en dur pour créer les pages
- [ ] Externaliser tous les messages, titres, labels dans des fichiers JSON
- [ ] Accessibilité (tabindex, etc)
- [ ] Gérer la redirection après la connexion
- [ ] Customiser le clic droit
- [ ] Ecrire des tests
- [ ] Compléter les classes / interfaces des différents Types :
    - [ ] List
    - [ ] Gift
    - [ ] User
- [ ] Connecter l'API
- [ ] Gestion des erreurs

### Inputs
- [x] ~~Créer les composants génériques Input :~~
    - [x] ~~Texte~~
    - [x] ~~Numérique~~
    - [x] ~~URL~~
    - [x] ~~Checkbox/Toggle~~
    - [x] ~~Select~~
    - [x] ~~Date~~
- [x] ~~Style~~ 
    - [x] ~~Normal~~
    - [x] ~~Hover, Focus~~
    - [x] ~~Erreur~~
    - [x] ~~Responsive~~
- [x] ~~Gérer le contenu avec le state~~
- [x] ~~Gérer les erreurs~~
- [x] ~~Option "Copy to clipboard"~~
- [x] ~~Ecrire des tests~~
- [ ] Ajouter un Date Picker custom
- [ ] Ajouter un bouton Ouvrir sur l'input URL
- [ ] Option Icon
- [x] ~~Ajouter un bouton de reset~~

### Style
- [ ] Responsive everything
- [ ] Ajouter un thème sombre
- [ ] Ajouter un bouton retour intégré
- [ ] Ajouter des skeletons pendant les chargements
- [ ] Créer des classes css pour éviter de dupliquer le code (flex, grid, etc)

## Nouuvelles fonctionnalités
- [x] Ajouter le prix
- [x] Ajouter un lien direct vers son cadeau pour le propriétaire de la liste
- [ ] Ajouter des tris par colonnes sur les listes
- [ ] Récupérer le prix à partir d'un lien sur les cadeaux
- [ ] Ajouter une preview imagée à partir d'un lien sur les cadeaux
- [ ] Nouvelle page : les cadeaux que j'ai réservé
- [ ] Nettoyage des listes après l'échéance : récap cadeau eu/pas eu
- [ ] Si date de naissance renseignée, envoyer un mail ou notif 1 mois avant pour créer sa liste
- [ ] Importer cadeaux d'une autre liste
- [ ] Ajouter des amis
- [ ] Ajouter des amis sur une liste
- [ ] Gérer la visibilité par cadeau ?