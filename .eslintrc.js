module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    env: {
        browser: true
    },
    globals: {},
    plugins: [
        'compat'
    ],
    rules: {
        'array-callback-return': 0,
        'arrow-body-style': [0, 'as-needed'],
        'arrow-parens': 0,
        'arrow-spacing': 0,
        'camelcase': [0, { 'properties': 'never' }], // required by Ember
        'comma-dangle': [1, 'never'],
        'compat/compat': [2],
        'consistent-return': [2],
        'curly': [2, 'multi-line'],
        'dot-notation': [2, { 'allowPattern': '^[a-z]+(-[a-z]+)+$' }],
        'eol-last': [2],
        'func-names': 0, // TODO: change to 2 and name all functions for the call stack
        'import/extensions': [0],
        'import/first': 0, // off because we import alphabetically
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': [0],
        'indent': [2, 4, { 'SwitchCase': 1 }],
        'max-len': [1, 120, 4, { 'ignoreComments': true, 'ignoreUrls': true }],
        'newline-after-var': 'error',
        'newline-per-chained-call': 0,
        'no-console': [0],
        'no-magic-numbers': 0,
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'no-plusplus': 0,
        'no-underscore-dangle': 0,
        'no-mixed-spaces-and-tabs': 2,
        'no-param-reassign': [2, { 'props': false }],
        'object-curly-spacing': [0, 'always'],
        'object-shorthand': 'error',
        'one-var': [0, 'always'], // TODO: change to 2 and use one var,
        'prefer-rest-params': 0,  // required by Ember
        'sort-imports': 'error',
        'space-after-function-name': 0,
        'space-before-function-name': 0,
        'space-before-function-paren': 0,
        'space-after-function-paren': 0,
        'space-in-brackets': [0, 'never'],
        'space-in-parens': [0, 'never'],
        'spaced-comment': 1,
        'wrap-regex': 2,
        'quotes': [2, 'single'],
        'linebreak-style': [2, 'unix'],
        'semi': [2, 'always']
    }
};
