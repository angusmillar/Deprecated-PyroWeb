import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, Message } from 'semantic-ui-react'

import toLower from 'lodash/toLower';
import FhirConstant from '../../Constants/FhirConstant';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import registerLanguageXml from 'react-syntax-highlighter/languages/hljs/xml';
import registerLanguageJson from 'react-syntax-highlighter/languages/hljs/json';
import { vs } from 'react-syntax-highlighter/styles/hljs';

import Expandable_Table from '../Reusable/Table/Expandable_Table'

export default class RestBodyComponent extends React.Component {
    
    static propTypes = {
        resourceName: PropTypes.string.isRequired,  
        resourceData: PropTypes.string.isRequired,  
        syntaxLanguage: PropTypes.string.isRequired,
        color: PropTypes.string,
    }

    static defaultProps = {        
    }

    constructor(props) {
        super(props);       
    }

    static SupportedSyntaxLanguages = { json: 'json', xml: 'xml' };

    render() {

        const renderExampleResourceAsXml = () => {
            registerLanguage(RestBodyComponent.SupportedSyntaxLanguages.xml, registerLanguageXml);
            return <SyntaxHighlighter
                language={RestBodyComponent.SupportedSyntaxLanguages.xml}
                style={vs}
                wrapLines={true}
                showLineNumbers >               
                {this.props.resourceData}
            </SyntaxHighlighter>;
        }

        const renderExampleResourceAsJson = () => {
            registerLanguage(RestBodyComponent.SupportedSyntaxLanguages.json, registerLanguageJson);
            return <SyntaxHighlighter
                language={RestBodyComponent.SupportedSyntaxLanguages.json}
                style={vs}
                wrapLines={true}
                showLineNumbers >
                {this.props.resourceData}                
            </SyntaxHighlighter>;
        }

        const resolveExampleResource = () => {
            if (toLower(this.props.syntaxLanguage) === RestBodyComponent.SupportedSyntaxLanguages.json) {
                return renderExampleResourceAsJson();
            } else if (toLower(this.props.syntaxLanguage) === RestBodyComponent.SupportedSyntaxLanguages.xml) {
                return renderExampleResourceAsXml();
            } else {
                return `unkown props syntaxLanguage of ${this.props.syntaxLanguage}, expected [${RestBodyComponent.SupportedSyntaxLanguages.json}|${RestBodyComponent.SupportedSyntaxLanguages.xml}] `;
            }            
        }

        

        const renderParameterRows = () => {
            const ContentType = this.props.syntaxLanguage;
            return (
                <Table.Body>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <p>The {this.props.resourceName} resource that needs to be added to the FHIR server</p>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <Message
                                icon='info'
                                content={<p>Please refer to the FHIR specification for a detailed docuemntation of how to structure a {this.props.resourceName} resource. <br /><a a='a' href={`${FhirConstant.STU3_SpecWebsite}/${this.props.resourceName}.html`} rel="noopener noreferrer" target='_blank'>Go-to FHIR Specification for the {this.props.resourceName} resource</a></p>}
                            >
                            </Message>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top' >
                            {/* <Grid className='overflow-x: auto'> */}
                            <Grid>
                                <Grid.Row only='tablet computer' >
                                    <div style={{ width: '800px' }}>
                                        {resolveExampleResource(ContentType)}
                                    </div>
                                </Grid.Row>
                            </Grid>


                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top' >
                            {/* <Grid className='overflow-x: auto'> */}


                            <Grid>
                            <Grid.Row only='mobile' >
                                <div style={{ width: '500px' }}>
                                    {resolveExampleResource(ContentType)}
                                </div>
                            </Grid.Row>
                        </Grid>


                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            )

        };

        const renderParametersRowsBody = (Expand) => {
            if (Expand) {
                return renderParameterRows()
            } else {
                return null;
            }
        };

        return (
            <Expandable_Table
                tableHeadingTitle='Body'
                tableHeadingIconType='code'
                // tableSubHeadingComponent={renderSubHeading}
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />
        )

    }
}

