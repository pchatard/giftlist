# Giftlist 1.0

## Légende
- required*
- unique$

## Modèles
### User :
- email*$ (String)
- username* (String)
- friends: List<User> (à voir selon la facilité de rechercher un user avec Auth0 ou pas)
- bookingPreferences: List<Preference> ()
- lists: List<List>
- bookedGifts: List<GiftBooking>

### List :
- id*$ (Si possible une String type uuid ?)
- title* (String)
- termDate (Date : heure pas nécéssaire)
- owners* List<User> (permettra de créer des listes communes)
- gifts: List<Gift>
- isShared*: Boolean (défaut : false)
- sharingCode*$ (String UUID : à générer à la création)
- authorizedUsers: List<User> (personnes ayant accès à la liste)

### Gift :
- id*$ (String/Number)
- title* (String)
- isFavorite* Boolean
- category*: GiftCategory (GiftCategory aura une valeur par défaut)
- lists*: List<List> (Permettra de switcher/importer un cadeau d'une liste à l'autre)
- price (Float)
- link / url (String)
- brand (String)
- size (String)
- color (String)
- comments (String)
- isHidden Boolean (défaut false) -> Permettra de cacher certains cadeaux
- isBooked* Boolean (défaut false)
// Trouver un moyen de stocker les données des personnes qui réservent en tenant compte de leurs préférences...
- bookedBy: List<User> (permettra de réserver des cadeaux à plusieurs)
- bookings: List<GiftBooking>

### GiftCategory :
- id*$
- title*

### GiftBooking :
- user*
- gift*
- showName Boolean