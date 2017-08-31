/**
 * @fileoverview Rendering Ember HBS templates should have consistent formatting
 * @author John Leja (Mariana Tek)
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Rendering Ember HBS templates should have consistent formatting',
            category: 'Stylistic Issues',
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Error messages / Current Node Property
        //----------------------------------------------------------------------

        const invalidOpenBodyTag = 'Opening body tag is not in the correct format';
        const invalidCloseBodyTag = 'Closing body tag is not in the correct format';
        const invalidClosingTemplateBlock = 'Closing template block element is not in the correct format';
        const invalidBodyTags = 'Wrapping component in body tags requires an opening and closing tag';
        const missingClosingBodyTag = 'Wrapping component in body tags requires them to be on their own lines';
        const missingClosingBraceNewLineTab =
            'Components with multiple properties and/or body tags should have closing brace on new line';
        const missingClosingParenNewLine = 'Closing parentheses for render element should be on a new line';
        const missingLeadingNewLineTab =
            'Components with multiple properties and/or wrapped in body tag should start on a new line';
        const multPropsInvalidFormat =
            'Component with multiple properties should format component and properties on individual lines';
        const singleCompomentNotSingleLined = 'Rendering a compoment with a single property should be single-lined';
        let currentNode;

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function _bodyTagCheck(value) {
            return value.match(/<\/?body>/g);
        }

        function _compomentPropertyCount(value) {
            const hasProps = value.match(/=/g);

            return hasProps ? hasProps.length : 0;
        }

        function _leadingTabCheck(value) {
            return value.match(/\n\s{8}/);
        }

        function _stripHandlebars(value) {
            const splitFront = value.split('{{')[1];

            return splitFront.split('}}')[0];
        }

        function _templateBlockCheck(value) {
            return value.match(/{{#/);
        }

        function _throwError(message) {
            return context.report(currentNode, message);
        }

        //----------------------------------------------------------------------
        // Linting Functions
        //
        // Run order is:
        //     _hasValidBodyTags()
        //     _leadingNewLineTabCheck()
        //     _propertyLineTabCheck()
        //     _endingNewLineTabCheck() * if more than 1 prop or has body tags
        //     _closingTemplateBlockCheck()
        //     _closingBodyTagCheck()
        //     _closingNewLineCheck()
        //----------------------------------------------------------------------

        function _closingNewLineCheck(node, value) {
            // Check that `); is on its own line
            // Last line before `); is going to be }} or </body>
            // Looks to see if new line is after one of those elements
            const hasBodyTags = _bodyTagCheck(value);
            const hasValidClosingParen = hasBodyTags ? value.match(/<\/body>\n/) : value.match(/}}\n/);

            if (!hasValidClosingParen) _throwError(missingClosingParenNewLine);
        }

        function _closingBodyTagCheck(node, value) {
            // Check that </body> is on its own line
            const hasBodyTags = _bodyTagCheck(value);

            if (hasBodyTags) {
                const hasValidClosingTag = value.match(/\n\s{8}<\/body>/);

                if (!hasValidClosingTag) _throwError(missingClosingBodyTag);
            }

            return _closingNewLineCheck(node, value);
        }

        function _closingTemplateBlockCheck(node, value) {
            // Checks that closing template block element exists with expected format
            const hasBodyTags = _bodyTagCheck(value);
            const isTemplateBlock = _templateBlockCheck(value);

            if (isTemplateBlock) {
                const hasValidClosingTemplateBlock =
                    hasBodyTags ? value.match(/\n\s{12}{{\//) : value.match(/\n\s{8}{{\//);

                if (!hasValidClosingTemplateBlock) _throwError(invalidClosingTemplateBlock);
            }

            return _closingBodyTagCheck(node, value);
        }

        function _endingNewLineTabCheck(node, value) {
            // Checks if }} is on its own line
            const expectedPropCount = _compomentPropertyCount(value);
            const hasBodyTags = _bodyTagCheck(value);
            const hasValidClosingBrace =
                hasBodyTags ? value.match(/\n\s{12}}}/) : value.match(/\n\s{8}}}/);

            if (!hasValidClosingBrace && expectedPropCount > 1) {
                _throwError(missingClosingBraceNewLineTab);
            }

            return _closingTemplateBlockCheck(node, value);
        }

        function _propertyLineTabCheck(node, value) {
            // Checks if:
            //   - Components with single property are single-lined
            //   - Components with multiple properties have properties on new lines with 2x tabs

            // Get just the compoment definition
            const componentDef = _stripHandlebars(value);
            const expectedPropCount = _compomentPropertyCount(componentDef);
            const hasBodyTags = _bodyTagCheck(value);
            const propStart = componentDef.match(/\n\s{12}/);

            // Single lined compoment with either a single property or no properties
            // Runs additional checks if there are body tags, otherwise stops further checks
            if (expectedPropCount <= 1 && !propStart) {
                return hasBodyTags ? _endingNewLineTabCheck(node, value) : undefined;
            }

            if (expectedPropCount > 1 && !propStart) {
                _throwError(multPropsInvalidFormat);

                // Move on to next check to avoid causing runtime errors
                return _endingNewLineTabCheck(node, value);
            }

            const justProps = componentDef.substr(propStart.index);
            const tabCheck = hasBodyTags ? justProps.match(/^\s{16}/mg) : justProps.match(/^\s{12}/mg);

            if (tabCheck && (tabCheck.length !== expectedPropCount)) {
                _throwError(multPropsInvalidFormat);
            }

            return _endingNewLineTabCheck(node, value);
        }

        function _leadingNewLineTabCheck(node, value) {
            // Checks that render blocks have a leading new line/tab if:
            // - Is wrapped in a body tag
            // - Has more than 1 property
            const hasBodyTags = _bodyTagCheck(value);
            const isTemplateBlock = _templateBlockCheck(value);
            const leadingNewLineTab = _leadingTabCheck(value);
            const propertyCount = _compomentPropertyCount(value);

            if (hasBodyTags) {
                const innerContentStart = value.split('<body>');
                const innerContentEnd = innerContentStart[1] ?
                    innerContentStart[1].split('<\body>') : innerContentStart[0].split('<\body>');
                const innerLeadingNewLineTab = _leadingTabCheck(innerContentEnd[0]);

                // Check if body tag is on a new line
                if (!leadingNewLineTab || (leadingNewLineTab && leadingNewLineTab.index !== 0)) {
                    _throwError(missingLeadingNewLineTab);
                }

                // Check that content inside tags is also on a new line
                if (!innerLeadingNewLineTab || (innerLeadingNewLineTab && innerLeadingNewLineTab.index !== 0)) {
                    _throwError(missingLeadingNewLineTab);
                }

                // Body tag has leading new line/tab, check that properties have valid format
                return _propertyLineTabCheck(node, value);
            }

            // Formatting render of compoment with multiple properties needs to start on new line
            if (!leadingNewLineTab && propertyCount > 1) _throwError(multPropsInvalidFormat);

            if (leadingNewLineTab) {
                // Rendering Components with single property should be single-lined
                // Also applies to template blocks with single properties
                if (propertyCount === 1 && !isTemplateBlock) _throwError(singleCompomentNotSingleLined);

                // Formatting render on multiple lines but not starting on a new line
                // Not sure if this is the best messsage for this, going with it for now
                if (leadingNewLineTab > 0) _throwError(missingLeadingNewLineTab);
            }

            return _propertyLineTabCheck(node, value);
        }

        function _hasValidBodyTags(node, value) {
            // Checks that you have:
            //   - Tags that match either <body> or </body>
            //   - If you have 2 tags, we check that the first and last are valid
            //   - IF you have more/less than 2, then we reject it because that's silly
            const hasBodyTags = _bodyTagCheck(value);

            if (hasBodyTags) {
                if (hasBodyTags.length === 2) {
                    if (!hasBodyTags[0].match(/<body>/)) _throwError(invalidOpenBodyTag);

                    if (!hasBodyTags[1].match(/<\/body>/)) _throwError(invalidCloseBodyTag);

                    // Body tags are legit, check for leading new line/tab
                    return _leadingNewLineTabCheck(node, value);
                }

                // body tags are invalid
                _throwError(invalidBodyTags);
            }

            // No body tags present or body tags are invalid,
            // move on to check for leading new line/tab
            return _leadingNewLineTabCheck(node, value);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            CallExpression: (node) => {
                // Make sure we're looking at `this.render(...)`
                if (node.callee.object && node.callee.object.type === 'ThisExpression') {
                    if (node.callee.property && node.callee.property.name === 'render') {
                        // Should only be one, but it's an array, so loop over it
                        node.arguments.forEach((TaggedTemplateExpression) => {
                            // Also ensure we're rendering an HBS template
                            if (TaggedTemplateExpression.tag.name === 'hbs') {
                                // Again, should only be one, but it's an array
                                TaggedTemplateExpression.quasi.quasis.forEach((quasi) => {
                                    // The rendered content inside of 'this.render(hbs`...`)'
                                    const renderValue = quasi.value.raw;

                                    // Start the linting checks with body tags and go from there
                                    currentNode = node;
                                    return _hasValidBodyTags(node, renderValue);
                                });
                            }
                        });
                    }
                }
            }
        };
    }
};
