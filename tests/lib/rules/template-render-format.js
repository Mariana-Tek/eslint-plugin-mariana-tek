/**
 * @fileoverview Rendering Ember HBS templates should have consistent formatting
 * @author Mariana Tek
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/template-render-format'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('template-render-format', rule, {

    valid: [
        {
            // Single property compoment without a body tag
            /*
                this.render(hbs`{{component-name}}`)
            */
            code: 'this.render(hbs\`{{component-name}}\`);'
        },
        {
            // Single property compoment without a body tag
            /*
                this.render(hbs`{{component-name prop1=prop1}}`)
            */
            code: 'this.render(hbs\`{{component-name prop1=prop1}}\`);'
        },
        {
            // Multi-property compoment without a body tag
            /*
                this.render(hbs`
                   {{component-name
                       prop1=prop1
                       prop2=prop2
                   }}
                `);
            */
            code: 'this.render(hbs\`\n        {{component-name\n            prop1=prop1\n            prop2=prop2\n        }}\n\    `);'
        },
        {
            // Multi-property component wrapped in a body tag
            /*
                this.render(hbs`
                   <body>
                       {{component-name
                           prop1=prop1
                           prop2=prop2
                       }}
                   </body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name\n                prop1=prop1\n                prop2=prop2\n            }}\n        </body>\n\    `);'
        },
        {
            // Single property componment wrapped in a body tag
            /*
                this.render(hbs`
                	<body>
                		{{component-name}}
                	</body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name}}\n        </body>\n\    `);'
        },
        {
            // Single property componment wrapped in a body tag
            /*
                this.render(hbs`
                	<body>
                		{{component-name prop1=prop1}}
                	</body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name prop1=prop1}}\n        </body>\n\    `);'
        },
        {
            // Single property template block
            /*
                this.render(hbs`
                	{{#component-name prop1=prop1}}
                        content
                	{{/component-name}}
                `);
            */
            code: 'this.render(hbs\`\n        {{#component-name prop1=prop1}}\n            content\n        {{/component-name}}\n\    `);'
        },
        {
            // Multiple property template block
            /*
                this.render(hbs`
                	{{#component-name
                        prop1=prop1
                        prop2=prop2
                    }}
                        content
                	{{/component-name}}
                `);
            */
            code: 'this.render(hbs\`\n        {{#component-name\n            prop1=prop1\n            prop2=prop2\n        }}\n            content\n        {{/component-name}}\n\    `);'
        }
    ],

    invalid: [
        {
            /*
                this.render(hbs`{{component-name prop1=prop1 prop2=prop2}}`);
            */
            code: 'this.render(hbs\`{{component-name prop1=prop1 prop2=prop2}}\`);',
            errors: [{
                message: 'Rendering a component with multiple properties should format component and properties on individual lines'
            }]
        },
        {
            /*
                this.render(hbs`</body>{{component-name prop1=prop1}}</body>`);
            */
            code: 'this.render(hbs\`</body>{{component-name prop1=prop1}}</body>\`);',
            errors: [{
                message: 'Opening body tag is not in the correct format'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                 message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>{{component-name prop1=prop1}}<body>`);
            */
            code: 'this.render(hbs\`<body>{{component-name prop1=prop1}}<body>\`);',
            errors: [{
                message: 'Closing body tag is not in the correct format'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                 message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body><body>{{component-name prop1=prop1}}</body>`);
            */
            code: 'this.render(hbs\`<body><body>{{component-name prop1=prop1}}</body>\`);',
            errors: [{
                message: 'Wrapping component in body tags requires an opening and closing tag'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>{{component-name prop1=prop1}}`);
            */
            code: 'this.render(hbs\`<body>{{component-name prop1=prop1}}\`);',
            errors: [{
                message: 'Wrapping component in body tags requires an opening and closing tag'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`{{component-name prop1=prop1}}</body>`);
            */
            code: 'this.render(hbs\`{{component-name prop1=prop1}}</body>\`);',
            errors: [{
                message: 'Wrapping component in body tags requires an opening and closing tag'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>{{component-name prop1=prop1}}</body>`);
            */
            code: 'this.render(hbs\`<body>{{component-name prop1=prop1}}</body>\`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                 message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                 message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>
                    {{component-name
                        prop1=prop1
                        prop2=prop2
                    }}</body>`);
            */
            code: 'this.render(hbs\`<body>\n        {{component-name\n            prop1=prop1\n            prop2=prop2\n        }}</body>`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                 message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>
                    {{component-name prop1=prop1
                       prop2=prop2
                    }}</body>`);
            */
            code: 'this.render(hbs\`<body>\n        {{component-name prop1=prop1\n            prop2=prop2\n        }}</body>`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`<body>
                    {{component-name
                        prop1=prop1 prop2=prop2
                    }}</body>`);
            */
            code: 'this.render(hbs\`<body>\n        {{component-name\n            prop1=prop1 prop2=prop2\n        }}</body>`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`
                    <body>
                        {{component-name
                            prop1=prop1
                            prop2=prop2 prop3=prop3
                        }}
                    </body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name\n                prop1=prop1\n                prop2=prop2 prop3=prop3\n            }}\n        </body>\n\`);',
            errors: [{
                message: 'Rendering a component with multiple properties should format component and properties on individual lines'
            }]
        },
        {
            /*
                this.render(hbs`
                	{{component-name
                		prop1=prop1
                		prop2=prop2 prop3=prop3
                	}}
                `);
            */
            code: 'this.render(hbs\`\n        {{component-name\n            prop1=prop1\n            prop2=prop2 prop3=prop3\n        }}\n\`);',
            errors: [{
                message: 'Rendering a component with multiple properties should format component and properties on individual lines'
            }]
        },
        {
            /*
                this.render(hbs`
                	<body>{{component-name
                		prop1=prop1
                		prop2=prop2
                	}}</body>`);
            */
            code: 'this.render(hbs\`\n        <body>{{component-name\n            prop1=prop1\n            prop2=prop2\n        }}</body>`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }, {
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`
                    {{component-name
                        prop1=prop1
                        prop2=prop2}}
                `);`
            */
            code: 'this.render(hbs\`\n        {{component-name\n            prop1=prop1\n            prop2=prop2}}\n\`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }]
        },
        {
            /*
                this.render(hbs`
                	<body>
                		{{component-name
                			prop1=prop1
                			prop2=prop2
                		}}</body>
                `);

            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name\n                prop1=prop1\n                prop2=prop2\n        }}</body>\n\`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line',
            }, {
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }]
        },
        {
            /*
                this.render(hbs`
                    <body>
                        {{component-name prop1=prop1}}</body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name prop1=prop1}}</body>\n`);',
            errors: [{
                message: 'Wrapping component in body tags requires them to be on their own lines'
            }]
        },
        {
            /*
                this.render(hbs`
                    <body>
                        {{component-name
                            prop1=prop1
                            prop2=prop2}}
                        </body>
                `);
            */
            code: 'this.render(hbs\`\n    <body>\n        {{component-name\n            prop1=prop1\n            prop2=prop2}}\n        </body>\n\`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should start on a new line'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }]
        },
        {
            /*
                this.render(hbs`
                    <body>
                        {{component-name
                            prop1=prop1
                            prop2=prop2}}
                    </body>
                `);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name\n                prop1=prop1\n                prop2=prop2}}\n        </body>\n\`);',
            errors: [{
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }]
        },
        {
            /*
                this.render(hbs`
                   {{component-name
                       prop1=prop1
                       prop2=prop2
                   }}`);
            */
            code: 'this.render(hbs\`\n        {{component-name\n            prop1=prop1\n            prop2=prop2\n        }}\`);',
            errors: [{
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`
                	<body>
                		{{component-name prop1=prop1}}
                	</body>`);
            */
            code: 'this.render(hbs\`\n        <body>\n            {{component-name prop1=prop1}}\n        </body>\`);',
            errors: [{
                message: 'Closing parentheses for render element should be on a new line'
            }]
        },
        {
            /*
                this.render(hbs`
                    {{#component-name prop1=prop1 prop2=prop2}} content {{/component-name}}
                `);
            */
            code: 'this.render(hbs\`\n        {{#component-name\n            prop1=prop1            prop2=prop2}} content {{/component-name}}\n\    `);',
            errors: [{
                message: 'Rendering a component with multiple properties should format component and properties on individual lines'
            }, {
                message: 'Components with multiple properties and/or wrapped in body tag should have closing brace on new line'
            }, {
                message: 'Closing template block element is not in the correct format'
            }]
        },
        {
            /*
                this.render(hbs`
                    {{#component-name
                        prop1=prop1
                        prop2=prop2
                    }}
                        content
                        {{/component-name}}
                `);
            */
            code: 'this.render(hbs\`\n        {{#component-name\n            prop1=prop1\n            prop2=prop2\n        }}\n            content\n            {{/component-name}}\n\    `);',
            errors: [{
                message: 'Closing template block element is not in the correct format'
            }]
        }
    ]
});
