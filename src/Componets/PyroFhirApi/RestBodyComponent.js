import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, Message } from 'semantic-ui-react'

import FhirConstant from '../../Constants/FhirConstant';
import WebLink from '../Reusable/WebLink/WebLink';
import FormatSupport from '../../SupportTools/FormatSupport'

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
        formatType: PropTypes.object.isRequired,
        isBundleResource: PropTypes.bool,
        color: PropTypes.string,
    }

    static defaultProps = {        
        isBundleResource: false,
    }

    constructor(props) {
        super(props);       
    }

    // static SupportedSyntaxLanguages = { json: 'json', xml: 'xml' };

    render() {
        
        const resolveExampleResource = () => {
            let RenderSyntaxLanguage;
            //Resolve and setup for requested Syntac Language
            if (this.props.formatType === FormatSupport.FormatType.JSON) {
                registerLanguage(FormatSupport.FormatType.JSON.code, registerLanguageJson);
                RenderSyntaxLanguage = FormatSupport.FormatType.JSON;
            } else if (this.props.formatType === FormatSupport.FormatType.XML) {
                registerLanguage(FormatSupport.FormatType.XML.code, registerLanguageXml);
                RenderSyntaxLanguage = FormatSupport.FormatType.XML
            } else {
                return `unkown props syntaxLanguage of ${this.props.formatType.toString()}, expected [${FormatSupport.FormatType.JSON.code}|${FormatSupport.FormatType.XML.code}] `;
            }            

            return (
                <SyntaxHighlighter
                language={RenderSyntaxLanguage.code}
                style={vs}
                wrapLines={true}
                showLineNumbers >               
                {this.props.resourceData}
            </SyntaxHighlighter>
            )
        }        

        const resolveMessage =() => {
            if (this.props.isBundleResource) {
                return (
                    <div>
                      <p>Please refer to the FHIR specification for a detailed docuemntation on how Bundle resources are structured. <br /><WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/bundle.html`} display={'Go-to FHIR Specification for the Bundle resource'} /></p>                        
                      <p>Or click here to refer to the FHIR specification for detailed docuemntation about {this.props.resourceName} resources. <br /><WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/${this.props.resourceName}.html`} display={`Go-to FHIR Specification for the ${this.props.resourceName} resource`}/></p>
                    </div>
                )
            } else {                
                return <p>Please refer to the FHIR specification for a detailed docuemntation of how to structure a {this.props.resourceName} resource. <br /><WebLink url={`${FhirConstant.STU3_SpecWebsiteUrl}/${this.props.resourceName}.html`} display={`Go-to FHIR Specification for the ${this.props.resourceName} resource`}/></p>
            }
        }
        const renderParameterRows = () => {
            // const ContentType = this.props.formatType;
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
                                        {resolveExampleResource()}
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
                                    {resolveExampleResource()}
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

