# Rendering Ember HBS templates should have consistent formatting (template-render-format)

Please describe the origin of the rule here.


## Rule Details

This rule aims to keep the formatting of rendering hbs templates in integration tests consistent and easily readable.

Examples of **incorrect** code for this rule:

```js

    this.render(hbs`{{component-name prop1=prop1 prop2=prop2}}`)

    this.render(hbs`<body>{{component-name prop1=prop1}}<body>`);

    this.render(hbs`<body><body>{{component-name prop1=prop1}}</body>`);

    this.render(hbs`<body>{{component-name prop1=prop1}}`);

    this.render(hbs`{{component-name prop1=prop1}}</body>`);

    this.render(hbs`<body>{{component-name prop1=prop1}}</body>`);

    this.render(hbs`<body>
        {{component-name
            prop1=prop1
            prop2=prop2
        }}</body>`);

    this.render(hbs`<body>
        {{component-name prop1=prop1
           prop2=prop2
        }}</body>`);

    this.render(hbs`<body>
        {{component-name
            prop1=prop1 prop2=prop2
        }}</body>`);

    this.render(hbs`
        <body>
            {{component-name
                prop1=prop1
                prop2=prop2 prop3=prop3
            }}
        </body>
    `);

    this.render(hbs`
        {{component-name
            prop1=prop1
            prop2=prop2 prop3=prop3
        }}
    `);

    this.render(hbs`
        <body>{{component-name
            prop1=prop1
            prop2=prop2
        }}</body>`);

    this.render(hbs`
        {{component-name
            prop1=prop1
            prop2=prop2}}
    `);

    this.render(hbs`
        <body>
            {{component-name
                prop1=prop1
                prop2=prop2
            }}</body>
    `);

    this.render(hbs`
        <body>
            {{component-name prop1=prop1}}</body>
    `);

    this.render(hbs`
        <body>
            {{component-name
                prop1=prop1
                prop2=prop2}}
            </body>
    `);

    this.render(hbs`
        <body>
            {{component-name
                prop1=prop1
                prop2=prop2}}
        </body>
    `);

    this.render(hbs`
        {{component-name
            prop1=prop1
            prop2=prop2
        }}`);

    this.render(hbs`
        <body>
            {{component-name prop1=prop1}}
        </body>`);

    this.render(hbs`
        {{#component-name prop1=prop1 prop2=prop2}} content {{/component-name}}
    `);

    this.render(hbs`
        {{#component-name
            prop1=prop1
            prop2=prop2
        }}
            content
            {{/component-name}}
    `);
```

Examples of **correct** code for this rule:

```js

Expected format (single property):
    // Single property
    this.render(hbs`{{component-name prop1=prop1}}`);

    // Single property wrapped in a body tag
    this.render(hbs`
        <body>
            {{component-name prop1=prop1}}
        </body>
    `);

    // Multiple properties
    this.render(hbs`
        {{component-name
            prop1=prop1
            prop2=prop2
        }}
    `);

    // Multiple properties wrapped in a body tag
    this.render(hbs`
        <body>
            {{component-name
                prop1=prop1
                prop2=prop2
            }}
        </body>
    `);

    // Single property template block
    this.render(hbs`
        {{#component-name prop1=prop1}}
            content
        {{/component-name}}
    `);

    // Single property template block wrapped in a body tag
    this.render(hbs`
        <body>
            {{#component-name prop1=prop1}}
                content
            {{/component-name}}
        </body>
    `);

    // Multiple property template block
    this.render(hbs`
        {{#component-name
            prop1=prop1
            prop2=prop2
        }}
            content
        {{/component-name}}
    `);

    // Multiple property template block wrapped in a body tag
    this.render(hbs`
        <body>
            {{#component-name
                prop1=prop1
                prop2=prop2
            }}
                content
            {{/component-name}}
        </body>
    `);

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

This rule has only been written to lint test files, and should only be added to the eslint config file in the tests folder.  Enabling the rule against application code will throw an error.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
