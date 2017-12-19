import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

class RestGetVReadComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {    
        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';                
        const _Description = `Return all history instances for the ${this.props.resourceName} resource with the given resource id. 
        A history Bundle resource will be retunred with historic ${this.props.resourceName} resources as its entries.`;                
        const _RequestHttpHeaders = [
            { name: 'Content-Type', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` }
        ];
        const _exampleRequests = [
            '/[id]/_history'
        ];

        const renderGetByIdTableBody = (Expand) => {
            if (Expand) {                
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{_Description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    httpHeaders={_RequestHttpHeaders}
                                    searchParameters={this.props.searchParameters}
                                    exampleRequests={_exampleRequests}
                                    color={_VerbGetColor} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestResponsesComponent color={_VerbGetColor} />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            } else {
                return null;
            }
        };

        const renderTableHeader = (Verb, Color, Path) => {
            return (
                <RestVerbHeaderComponent
                    verb={Verb}
                    color={Color}
                    path={Path}
                />
            )
        };

        return (
            <Expandable_Table
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, `${this.props.resourceName}/[id]/_history`)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetByIdTableBody}
            />
        )
    }
}

//Type Checking
RestGetVReadComponent.propTypes = {    
    resourceName: PropTypes.string.isRequired,
    searchParameters: PropTypes.array
}

RestGetVReadComponent.defaultProps = {
}

export default RestGetVReadComponent;  
