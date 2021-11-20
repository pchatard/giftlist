<template>
	<DefaultLayout title="Home">
		<div>
			<Subtitle>TODO</Subtitle>
			<div class="grid grid-cols-3 gap-4">
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Liste et Liste partagée</h3>
					<ul class="list-disc list-inside">
						<li class="line-through text-gray-400">Créer une vue en grille</li>
						<li class="line-through text-gray-400">
							Créer un toggle button entre Grid / List
						</li>
						<li class="line-through text-gray-400">
							Supprimer les titres Favoris et Cadeaux pour tout regrouper
						</li>
						<li class="line-through text-gray-400">Réorganiser les colonnes</li>
						<li class="line-through text-gray-400">Replacer le toggle List / Grid</li>
						<li class="line-through text-gray-400">
							Ajouter les redirections vers les pages gifts
						</li>
						<li>Ajouter la gestion du status de la liste => Page dédiée</li>
						<li>Revoir le design des Gift en grid</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Mes listes, Mes listes partagées</h3>
					<ul class="list-disc list-inside">
						<li>
							Ajouter un menu déroulant sur le bouton Options : modifier, gérer la visibilité
						</li>
						<li>Connecter les options aux actions du stores</li>
						<li>Supprimer : Modal de confirmation</li>
						<li>Supprimer : Connecter à l'action du store correspondante</li>
						<li>Mes listes : CTA vers la page de création de listes</li>
						<li>
							Mes listes partagées : CTA -> Ouvre un popup pour rentrer un nouveau code de
							partage
						</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Nouvelle Liste</h3>
					<ul class="list-disc list-inside">
						<li>Formulaire</li>
						<li>
							Champs : Nom de la liste, échéance, visibilité (ajouter mes amis directement ?)
						</li>
						<li>CTA : Créer la liste (Retour vers la liste)</li>
						<li>CTA : Ajouter des cadeaux (Page d'ajout de cadeaux)</li>
						<li>Annuler</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Nouveau cadeau</h3>
					<ul class="list-disc list-inside">
						<li>Formulaire</li>
						<li>Champs : Titre*, lien, prix, marque, taille, couleur, type</li>
						<li>CTA : Créer le cadeau (Retour vers la liste)</li>
						<li>CTA : Ajouter un autre cadeau (Page d'ajout de cadeaux)</li>
						<li>Annuler</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Profil</h3>
					<ul class="list-disc list-inside">
						<li>Afficher mes informations</li>
						<li>Modifier mon mot de passe (envoi de lien par email)</li>
						<li>RGPD : Télécharger mes données personnelles</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Préférences</h3>
					<ul class="list-disc list-inside">
						<li class="line-through text-gray-400">Vue liste / grille</li>
						<li class="line-through text-gray-400">
							Montrer aux autres que je réserve : on/off
						</li>
						<li>Nom apparent lors des réservations</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Connexion</h3>
					<ul class="list-disc list-inside">
						<li>Formulaire</li>
						<li>Mot de passe oublié</li>
						<li>Différents choix de mode de connexion</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Inscription</h3>
					<ul class="list-disc list-inside">
						<li>Formulaire</li>
						<li>Champs : Prénom*, Nom*, Date de naissance, email*, mdp</li>
						<li>Différents choix de mode d'inscription</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Accueil</h3>
					<ul class="list-disc list-inside">
						<li></li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Others</h3>
					<ul class="list-disc list-inside">
						<li class="line-through text-gray-400">Create AuthUtils class</li>
						<li class="line-through text-gray-400">Create dumb data</li>
						<li>Write tests</li>
						<li>Finalize Types</li>
						<li>Connect API</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Styling</h3>
					<ul class="list-disc list-inside">
						<li>Responsive everything</li>
						<li>Add dark theme</li>
						<li>Create classes to avoid duplicate code (flex, grid, etc)</li>
					</ul>
				</div>
				<div class="p-3 border border-gray-200 shadow-md rounded-md">
					<h3 class="text-xl font-bold">Nouvelles fonctionnalités</h3>
					<ul class="list-disc list-inside">
						<li class="line-through text-gray-400">Ajouter le prix</li>
						<li class="line-through text-gray-400">
							Ajouter un lien direct vers son cadeau pour le propriétaire de la liste
						</li>
						<li>Ajouter des tris par colonnes sur les listes</li>
						<li>Récupérer le prix à partir d'un lien sur les cadeaux</li>
						<li>Ajouter une preview imagée à partir d'un lien sur les cadeaux</li>
						<li>Nouvelle page : les cadeaux que j'ai réservé</li>
						<li>Nettoyage des listes après l'échéance : récap cadeau eu/pas eu</li>
						<li>
							Si date de naissance renseignée, envoyer un mail ou notif 1 mois avant pour
							créer sa liste
						</li>
						<li>Importer cadeaux d'une autre liste</li>
						<li>Ajouter des amis</li>
						<li>Ajouter des amis sur une liste</li>
						<li>Gérer la visibilité par cadeau ?</li>
					</ul>
				</div>
			</div>
		</div>
		<div>
			<Subtitle>Resources</Subtitle>
			<ul>
				<li>
					<a href="https://heroicons.com/" rel="noreferrer noopener" class="text-blue-500"
						>Heroicons</a
					>
				</li>
				<li>
					<a href="https://tailwindui.com/" rel="noreferrer noopener" class="text-blue-500"
						>TailwindUI</a
					>
				</li>
				<li>
					<a href="https://headlessui.dev/vue" rel="noreferrer noopener" class="text-blue-500"
						>HeadlessUI</a
					>
				</li>
			</ul>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "Home",
	components: { DefaultLayout, Subtitle },
});
</script>
