# Roadmap

## Pages publiques
### Accueil
### Connexion
- [ ] Formulaire
- [ ] Mot de passe oublié
- [ ] Différents choix de mode de connexion
                        
### Inscription
- [ ] Formulaire
- [ ] Champs : Prénom*, Nom*, Date de naissance, email*, mdp
- [ ] Différents choix de mode d'inscription

## Pages privées
### Ma liste, Ma liste partagée
- [ ] **[Liste]** Gestion du status de la liste => Créer un lien vers une page dédiée /app/lists/:id/settings
- [ ] **[Liste partagée]** Afficher les détails de la liste (propriétaire, échéance, etc)
- [ ] Revoir le design des Gift en grid
- [ ] Connecter les boutons aux bonnes actions du store :
    - [ ] **[Liste]** Favori / Pas favori
    - [ ] **[Liste]** Supprimer
    - [ ] **[Liste partagée]** Détails
    - [ ] **[Liste partagée]** Réserver

### Mes listes, mes Listes partagées
- [ ] **[Listes]** Ajouter un menu déroulant sur le bouton Options : modifier, gérer la visibilité
- [ ] Connecter les options aux actions du stores :
    - [ ] **[Listes]** Modifier / Gérer la visibilité : Page dédiée /app/lists/:id/settings
    - [ ] **[Listes partagées]** Détails : Modal ou page dédiée
- [ ] **[Listes]** Supprimer : Modal de confirmation
- [ ] **[Listes]** Modal Supprimer : Connecter à l'action du store correspondante
- [ ] **[Listes]** CTA : Redirige vers la page de création de listes
- [ ] **[Listes partagées]** CTA : Ouvre un popup pour rentrer un nouveau code de partage

### Nouvelle liste
- [ ] Formulaire
- [ ] Champs : Nom de la liste, échéance, visibilité (ajouter mes amis directement ?)
- [ ] CTA : Créer la liste (Retour vers la liste)
- [ ] CTA : Ajouter des cadeaux (Page d'ajout de cadeaux)
- [ ] Annuler

### Nouveau cadeau
- [ ] Formulaire
- [ ] Champs : Titre*, lien, prix, marque, taille, couleur, type
- [ ] CTA : Créer le cadeau (Retour vers la liste)
- [ ] CTA : Ajouter un autre cadeau (Page d'ajout de cadeaux)
- [ ] Annuler

### Profil
- [ ] Afficher mes informations
- [ ] Modifier mon mot de passe (envoi de lien par email)
- [ ] RGPD : Télécharger mes données personnelles

### Préférences
- [ ] Vue liste / grille
- [ ] Montrer aux autres que je réserve : on/off
- [ ] Nom apparent lors des réservations
- [ ] Gestion du thème sombre

## Général
### Fonctions générales
- [ ] Créer une classe AuthUtils :
    - [x] Créer la base de la classe
    - [ ] Compléter la classe en fonction de la méthode d'authentification choisie
- [x] Créer des datas en dur pour créer les pages
- [ ] Customiser le clic droit
- [ ] Ecrire des tests
- [ ] Compléter les classes / interfaces des différents Types :
    - [ ] List
    - [ ] Gift
    - [ ] User
- [ ] Connecter l'API
- [ ] Gestion des erreurs

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