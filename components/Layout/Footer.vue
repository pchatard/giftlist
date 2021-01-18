<template>
    <footer>
        <div class="footer">
            <div>GiftList © {{ year }}</div>
            <div>Tous droits réservés</div>
            <div>
                Créé par
                <a
                    href="https://pierrechatard.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Pierre Chatard
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            date: new Date(),
        };
    },
    computed: {
        year() {
            return this.date.getFullYear();
        },
    },
};
</script>
