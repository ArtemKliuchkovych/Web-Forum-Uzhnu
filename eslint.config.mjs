import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
    { files: ['src/**/*.{js,mjs,cjs,jsx}'] },
    {ignores: ['dist/**/*']},
    {
        settings: {
            pluginReact: {
                version: 'detect',
            },
        },
    },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'no-undef': 'off',
        },
    },
];
