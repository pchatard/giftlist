<template>
    <main>
        <div class="landing">
            <section class="hero">
                <img src="@/assets/images/LogoBig.png" alt="Gift Logo" />
                <h1>GiftList</h1>
                <p>La meilleure application pour gérer vos wishlists</p>
                <NuxtLink to="/login" tag="button" class="btn btn-list">
                    Créer ma liste
                </NuxtLink>
            </section>
            <section class="about">
                <h2>Comment ça marche ?</h2>
                <div class="details">
                    <div>
                        <div>
                            <img
                                src="@/assets/images/ListIcon.png"
                                alt="List Icon"
                            />
                            <h3>Créez</h3>
                        </div>
                        <ul>
                            <li>Créez et gérez vos wishlists.</li>
                            <li>
                                Ajoutez vos envies et spécifiez vos favorites.
                            </li>
                            <li>
                                Précisez une couleur, une taille ou une marque
                                pour vos souhaits.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <img
                                src="@/assets/images/icons/SharedDark.png"
                                alt="Share Icon"
                            />
                            <h3>Partagez</h3>
                        </div>
                        <ul>
                            <li>
                                Partagez vos listes avec vos amis, votre famille
                                ou vos invités.
                            </li>
                            <li>
                                Rien de plus simple, envoyez leur un code ou un
                                lien.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <img
                                src="@/assets/images/GiftIcon.png"
                                alt="Gift Icon"
                            />
                            <h3>Offrez</h3>
                        </div>
                        <ul>
                            <li>Choisissez ce que vous offrez à vos amis.</li>
                            <li>
                                Parcourez leurs listes et réservez ce que vous
                                avez choisi.
                            </li>
                            <li>
                                La liste affiche les cadeaux qui sont
                                disponibles, et ceux qui sont déjà réservés.
                            </li>
                        </ul>
                    </div>
                </div>

                <NuxtLink to="/login" tag="button" class="btn btn-list">
                    Créer ma liste
                </NuxtLink>
            </section>
        </div>
    </main>
</template>
