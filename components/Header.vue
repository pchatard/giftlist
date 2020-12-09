<template>
    <header
        class="fixed h-20 w-screen flex justify-between items-center bg-white border-2 border-black p-4"
    >
        <NuxtLink to="/" class="logo"><h1>GiftList</h1></NuxtLink>
        <nav>
            <ul class="flex">
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/app">Dashboard</NuxtLink></li>
                <li>
                    <NuxtLink to="/app/profile">Account</NuxtLink>
                </li>
                <li><NuxtLink to="/app/lists">Lists</NuxtLink></li>
                <li><NuxtLink to="/login">Login</NuxtLink></li>
                <li>
                    <NuxtLink to="/register">Register</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="postcss">
nav li a {
    @apply mx-4 py-2;
    border-bottom: 2px solid transparent;
}

nav .nuxt-link-exact-active,
nav ul li:hover a {
    @apply py-2;
    border-bottom: 2px solid red;
}

nav .nuxt-link-exact-active.logo {
    border: none;
}
</style>
