<template>
    <div class="password-checker">
        <h2>Password Checker</h2>
        <ul>
            <li :class="{ valid: checks.length }">
                <ValidIcon v-if="checks.length" />
                <UnvalidIcon v-else />

                Password must be at least 8 characters
            </li>
            <li :class="{ valid: checks.digit }">
                <ValidIcon v-if="checks.digit" />
                <UnvalidIcon v-else />
                Password should contain one number
            </li>
            <li :class="{ valid: checks.upper }">
                <ValidIcon v-if="checks.upper" />
                <UnvalidIcon v-else />
                Password should contain one uppercase letter
            </li>
            <li :class="{ valid: checks.lower }">
                <ValidIcon v-if="checks.lower" />
                <UnvalidIcon v-else />
                Password should contain one lowercase letter
            </li>
            <li :class="{ valid: checks.identical }">
                <ValidIcon v-if="checks.identical" />
                <UnvalidIcon v-else />
                Password confirmation should match
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

<style lang="scss">
.valid {
    color: green;
}
</style>
