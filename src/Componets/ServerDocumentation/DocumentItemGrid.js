import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Divider } from 'semantic-ui-react';

import FormatSupport from '../../SupportTools/FormatSupport';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import registerLanguageXml from 'react-syntax-highlighter/languages/hljs/xml';


import { vs } from 'react-syntax-highlighter/styles/hljs';
//import { Link } from 'react-router-dom'

export default class DocumentItemGrid extends React.Component {

    static propTypes = {
        documentItem: PropTypes.object.isRequired,
        includeDivider: PropTypes.bool.isRequired,
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
    }

    render() {

        registerLanguage(FormatSupport.FormatType.XML.code, registerLanguageXml);
        const RenderSyntaxLanguage = FormatSupport.FormatType.XML

        const renderDivider = () => {
            if (this.props.includeDivider) {
                return (
                    <Grid.Row columns={1}>
                        <Grid.Column width={16} verticalAlign='middle' >
                            <Divider></Divider>
                        </Grid.Column>
                    </Grid.Row>
                )
            }
            else {
                return null;
            }
            
        }

        return (
            <Grid stackable >
                <Grid.Row columns={2}>
                    <Grid.Column width={2} verticalAlign='middle' >
                        <Header size='small'>Command Key</Header>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='top' >
                        <code>{this.props.documentItem.Command}</code>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={2} verticalAlign='middle' >
                        <Header size='small'>Value Type</Header>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='top' >
                        {this.props.documentItem.ValueType}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={2} verticalAlign='middle' >
                        <Header size='small'>Default</Header>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='top' >
                        <code>{this.props.documentItem.Default}</code>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={2} verticalAlign='middle' >
                        <Header size='small'>Example</Header>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='top' >
                        <SyntaxHighlighter
                            language={RenderSyntaxLanguage.code}
                            style={vs}
                            wrapLines={true}>
                            {this.props.documentItem.Example}
                        </SyntaxHighlighter>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={2} verticalAlign='middle' >
                        <Header size='small'>Description</Header>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='top' >                        
                            {this.props.documentItem.Description}                        
                    </Grid.Column>
                </Grid.Row>
                {renderDivider()}
            </Grid>
        )
    }
}

