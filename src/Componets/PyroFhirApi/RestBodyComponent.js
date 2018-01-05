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
        exampleMessage: PropTypes.string.isRequired,
        resourceName: PropTypes.string.isRequired,  
        resourceData: PropTypes.string.isRequired,  
        syntaxLanguage: PropTypes.string.isRequired,
        isBundleResource: PropTypes.bool,
        color: PropTypes.string,
    }

    static defaultProps = {        
        isBundleResource: false,
    }

    constructor(props) {
        super(props);       
    }

    static SupportedSyntaxLanguages = { json: 'json', xml: 'xml' };

    render() {
        
        const resolveExampleResource = () => {
            let RenderSyntaxLanguage;
            //Resolve and setup for requested Syntac Language
            if (toLower(this.props.syntaxLanguage) === RestBodyComponent.SupportedSyntaxLanguages.json) {
                registerLanguage(RestBodyComponent.SupportedSyntaxLanguages.json, registerLanguageJson);
                RenderSyntaxLanguage = RestBodyComponent.SupportedSyntaxLanguages.json
            } else if (toLower(this.props.syntaxLanguage) === RestBodyComponent.SupportedSyntaxLanguages.xml) {
                registerLanguage(RestBodyComponent.SupportedSyntaxLanguages.xml, registerLanguageXml);
                RenderSyntaxLanguage = RestBodyComponent.SupportedSyntaxLanguages.xml
            } else {
                return `unkown props syntaxLanguage of ${this.props.syntaxLanguage}, expected [${RestBodyComponent.SupportedSyntaxLanguages.json}|${RestBodyComponent.SupportedSyntaxLanguages.xml}] `;
            }            

            return (
                <SyntaxHighlighter
                language={RenderSyntaxLanguage}
                style={vs}
                wrapLines={true}
                showLineNumbers >               
                {this.props.resourceData}
            </SyntaxHighlighter>
            )
        }        

        const resolveMessage =() => {
            if (this.props.isBundleResource) {
                return <p>Please refer to the FHIR specification for a detailed docuemntation of how Bundle resources are structured. <br /><a a='a' href={`${FhirConstant.STU3_SpecWebsite}/bundle.html`} rel="noopener noreferrer" target='_blank'>Go-to FHIR Specification for the Bundle resource</a></p>
            } else {
                return <p>Please refer to the FHIR specification for a detailed docuemntation of how to structure a {this.props.resourceName} resource. <br /><a a='a' href={`${FhirConstant.STU3_SpecWebsite}/${this.props.resourceName}.html`} rel="noopener noreferrer" target='_blank'>Go-to FHIR Specification for the {this.props.resourceName} resource</a></p>
            }
        }
        const renderParameterRows = () => {
            const ContentType = this.props.syntaxLanguage;
            return (
                <Table.Body>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <p>{this.props.exampleMessage}</p>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top'>
                            <Message
                                icon='info'
                                content={resolveMessage()}
                            />                            
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row colSpan='3'>
                        <Table.Cell colSpan='3' width='16' verticalAlign='top' >                            
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
                tableRowsFunction={renderParametersRowsBody}
                tableColorType={this.props.color}
            />
        )

    }
}

