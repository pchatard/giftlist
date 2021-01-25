<template>
    <main>
        <div class="error-page lg-container">
            <img src="@/assets/images/ErrorGift.png" alt="Opened Gift" />
            <h1>Une erreur est survenue...</h1>
            <NuxtLink
                :to="this.$auth.loggedIn ? '/app' : '/'"
                tag="button"
                class="btn btn-list"
            >
                Accueil
            </NuxtLink>
            <details>
                <summary>Plus d'infos</summary>
                <p>
                    {{ error.message }}
                </p>
            </details>
        </div>
    </main>
</template>

<script>
export default {
    props: ['error'],
};
</script>
