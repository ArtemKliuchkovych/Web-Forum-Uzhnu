const { defineConfig } = require('cypress');
const webpackConfig = require('./config/webpack.cypress.config');

module.exports = defineConfig({
    e2e: {
        experimentalStudio: true,
        viewportWidth: 1440,
        viewportHeight: 900,
        defaultCommandTimeout: 10000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('@cypress/code-coverage/task')(on, config);

            return config;
        },
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig,
        },
        viewportWidth: 1440,
        viewportHeight: 900,
        setupNodeEvents(on, config) {
            // component testing node events setup code
            // https://docs.cypress.io/guides/tooling/code-coverage
            require('@cypress/code-coverage/task')(on, config);

            on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

            return config;
        },
    },
});
