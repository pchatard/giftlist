<template>
    <div class="password-checker">
        <h2>Le mot de passe doit :</h2>
        <ul>
            <li :class="{ valid: checks.length }">
                <ValidIcon v-if="checks.length" />
                <UnvalidIcon v-else />
                Comporter 8 caractères minimum.
            </li>
            <li :class="{ valid: checks.digit }">
                <ValidIcon v-if="checks.digit" />
                <UnvalidIcon v-else />
                Comporter un chiffre.
            </li>
            <li :class="{ valid: checks.upper }">
                <ValidIcon v-if="checks.upper" />
                <UnvalidIcon v-else />
                Comporter une lettre majuscule.
            </li>
            <li :class="{ valid: checks.lower }">
                <ValidIcon v-if="checks.lower" />
                <UnvalidIcon v-else />
                Comporter une lettre minuscule.
            </li>
            <li :class="{ valid: checks.identical }">
                <ValidIcon v-if="checks.identical" />
                <UnvalidIcon v-else />
                Etre identique à la confirmation.
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        passwords: {
            default: () => [],
            type: Array,
        },
    },
    data() {
        return {
            checks: {
                length: false,
                digit: false,
                upper: false,
                lower: false,
                identical: false,
            },
        };
    },
    watch: {
        passwords(newPasswords) {
            this.performChecks(newPasswords);
        },
    },
    methods: {
        performChecks(passwords) {
            this.checks.length = passwords[0].length >= 8;
            this.checks.digit = /\d/.test(passwords[0]);
            this.checks.upper = /[A-Z]/.test(passwords[0]);
            this.checks.lower = /[a-z]/.test(passwords[0]);
            this.checks.identical =
                passwords[0] === passwords[1] && passwords[0];
        },
    },
};
</script>
