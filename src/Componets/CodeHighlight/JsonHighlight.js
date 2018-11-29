import React from 'react';

import PropTypes from 'prop-types';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import registerLanguageXml from 'react-syntax-highlighter/languages/hljs/json';

import { vs } from 'react-syntax-highlighter/styles/hljs';

export default class JsonHighlight extends React.Component {

    static propTypes = {
        code: PropTypes.string.isRequired,
        wrapLines: PropTypes.bool,
    }

    static defaultProps = {
        wrapLines: true,
    }

    constructor(props) {
        super(props);       
    }


    render() {
        const RenderSyntaxLanguage = 'json';
        registerLanguage(RenderSyntaxLanguage, registerLanguageXml);        

        return (
            <SyntaxHighlighter
                language={RenderSyntaxLanguage}
                style={vs}
                wrapLines={this.props.wrapLines}>               
                {this.props.code}
            </SyntaxHighlighter>
        )
    }

}
