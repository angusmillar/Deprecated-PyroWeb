import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, Message } from 'semantic-ui-react'
// import isNil from 'lodash/isNil';
// import map from 'lodash/map';

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { vs } from 'react-syntax-highlighter/styles/hljs';
import FhirConstant from '../../Constants/FhirConstant';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import xml from 'react-syntax-highlighter/languages/hljs/xml';
registerLanguage('xml', xml);
import { vs } from 'react-syntax-highlighter/styles/hljs';

import Expandable_Table from '../Reusable/Table/Expandable_Table'
import FhirResourceExampleGenerator from './FhirResourceExampleGenerator'

class RestRequestBodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // const renderSubHeading = () => {
        //     return (
        //         <Table.Row>
        //             <Table.HeaderCell colSpan='1' width='4'>Name</Table.HeaderCell>
        //             <Table.HeaderCell colSpan='1' width='8'>Value</Table.HeaderCell>
        //             <Table.HeaderCell colSpan='1' width='4'>More Info</Table.HeaderCell>
        //         </Table.Row>
        //     )
        // };


        const renderExampleResourceAsXml = () => {
            return <SyntaxHighlighter language='xml' style={vs}>{FhirResourceExampleGenerator.getXmlResource(this.props.resourceName)}</SyntaxHighlighter>;
        }

        const renderParameterRows = () => {
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
                            <Grid className='overflow-x: auto'>
                                <Grid.Column>
                                    {renderExampleResourceAsXml()}
                                </Grid.Column>
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

RestRequestBodyComponent.propTypes = {
    resourceName: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default RestRequestBodyComponent;  
