# Rendering Ember HBS templates should have consistent formatting (template-render-format)

This linting rule came about due to the fact that you can write the template render block in integration tests multiple
ways.  Technically, they are all correct, we want to keep our conventions easily readable and consistent, as if the
project was written by a single person.  This rule will keep the various ways that you can format the render block
in check, while maintaining readability and consistency.


## Rule Details

This rule aims to keep the formatting of rendering hbs templates in integration tests consistent and easily readable,
as well as to closely resemble how we would include the component element into an Ember template.

The general convention is to single-line rendering a component with 0-1 properties passed into it, and to break up
the render block onto multiple lines if multiple properties are passed, or if a single-property component is wrapped
in <body> tags.

A special case is if the template is being rendered in block format.  Component tags and inner content are still
broken up onto separate lines, but the component open block element will still follow the non-block rules.  It should
be noted that component block content is not linted by this rule, only the component elements themselves.

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

## When Not To Use It

This rule has only been written to lint test files, and should therefore only be added to the eslint config file in the
tests folder.  Enabling the rule against application code will throw an error.

This rule also assumes that you are using spaces instead of tabs, with 4 spaces = 1 tab.  Disable it if you are using tabs or 2 spaces.
