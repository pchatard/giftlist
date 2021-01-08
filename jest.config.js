module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js',
    },
    moduleFileExtensions: ['js', 'vue', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/api/helpers/*.js',
        '<rootDir>/api/middlewares/*.js',
        '<rootDir>/api/services/*.js',
        '<rootDir>/api/controllers/*.js',
        // '<rootDir>/components/**/*.vue',
        // '<rootDir>/pages/**/*.vue',
    ],
};
