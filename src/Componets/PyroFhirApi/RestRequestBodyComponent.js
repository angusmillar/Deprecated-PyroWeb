import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, Message } from 'semantic-ui-react'
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import FhirConstant from '../../Constants/FhirConstant';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import xml from 'react-syntax-highlighter/languages/hljs/xml';
import json from 'react-syntax-highlighter/languages/hljs/json';
import { vs } from 'react-syntax-highlighter/styles/hljs';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator'

export default class RestRequestBodyComponent extends React.Component {
    
    static propTypes = {
        resourceName: PropTypes.string.isRequired,
        selectedContentType: PropTypes.string.isRequired,
        color: PropTypes.string,
    }

    static defaultProps = {        
    }

    constructor(props) {
        super(props);
    }

    render() {

        const renderExampleResourceAsXml = () => {
            registerLanguage('xml', xml);
            return <SyntaxHighlighter
                language='xml'
                style={vs}
                wrapLines={true}
                showLineNumbers >
                {FhirResourceExampleGenerator.getXmlResource(this.props.resourceName)}
            </SyntaxHighlighter>;
        }

        const renderExampleResourceAsJson = () => {
            registerLanguage('json', json);
            return <SyntaxHighlighter
                language='json'
                style={vs}
                wrapLines={true}
                showLineNumbers >
                {FhirResourceExampleGenerator.getJsonResource(this.props.resourceName)}
            </SyntaxHighlighter>;
        }

        const resolveExampleResource = (ContentType) => {
            if (includes(toLower(ContentType), 'json')) {
                return renderExampleResourceAsJson();
            } else if (includes(toLower(ContentType), 'xml')) {
                return renderExampleResourceAsXml();
            } else {
                return 'unkown format for example';
            }            
        }

        const renderParameterRows = () => {
            const ContentType = this.props.selectedContentType;
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

