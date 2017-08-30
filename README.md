# eslint-plugin-mariana-tek

Collection of custom ESLint rules for Mariana Tek JS Development Teams

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-mariana-tek`:

```
$ npm install eslint-plugin-mariana-tek --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-mariana-tek` globally.

## Usage

Add `mt-eslint-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mt-eslint-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mt-eslint-rules/rule-name": 2
    }
}
```

## Supported Rules

* `template-render-format`: Enforces consistent formatting of hbs template rendering in integration tests
