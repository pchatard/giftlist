export default {
    ssr: false,
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'GiftList',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    serverMiddleware: { '/api': '~/api' },

    router: {
        middleware: ['auth'],
    },

    env: {
        projectUrl: process.env.PROJECT_URL,
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/fontawesome',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'nuxt-clipboard2',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        // baseURL: 'http://localhost:5000/api',
    },

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/auth/local/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: {
                        url: '/api/auth/local/signout',
                        method: 'get',
                    },
                    user: {
                        url: '/api/users/me',
                        method: 'get',
                    },
                },
            },
        },
    },

    fontawesome: {
        icons: {
            solid: ['faHeart', 'faUsers'],
            regular: ['faHeart'],
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
};
