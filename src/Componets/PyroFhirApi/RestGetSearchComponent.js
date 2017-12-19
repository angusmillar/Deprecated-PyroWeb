import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react'

import Expandable_Table from '../Reusable/Table/Expandable_Table';
import RestVerbHeaderComponent from './RestVerbHeaderComponent';
import RestRequestComponent from './RestRequestComponent';
import RestResponsesComponent from './RestResponsesComponent';
import FhirConstant from '../../Constants/FhirConstant';

class RestGetSearchComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {    
        const VerbGetName = 'GET';
        const _VerbGetColor = 'blue';
        //Example string must be post the Resource Name
        const _exampleRequests = [
            '?searchParameterName=value&searchParameterName=value',
            ' '
        ];        
        const _RequestHttpHeaders = [
            { name: 'Content-Type', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` },
            { name: 'Accept', value: 'application/fhir+xml', moreInfo: `${FhirConstant.STU3_SpecWebsite}/http.html#mime-type` }
        ];

        const renderGetSearchTableBody = (Expand) => {
            if (Expand) {
                const description = `Return all ${this.props.resourceName} resources or filter ${this.props.resourceName} resources by a set of serach parameters. A search Bundle resource will be retunred with ${this.props.resourceName} resources as its entries.`;
                return (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='16'>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan='16'>
                                <RestRequestComponent
                                    resourceName={this.props.resourceName}
                                    exampleRequests={_exampleRequests}
                                    httpHeaders={_RequestHttpHeaders}
                                    searchParameters={this.props.searchParameters}
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
                tableHeadingComponent={renderTableHeader(VerbGetName, _VerbGetColor, this.props.resourceName)}
                tableHeadingTitle={VerbGetName}
                tableColorType={_VerbGetColor}
                tableColorInverted={false}
                tableRowsFunction={renderGetSearchTableBody}
            />
        )
    }

}
//Type Checking
RestGetSearchComponent.propTypes = {    
    resourceName: PropTypes.string.isRequired,
    searchParameters: PropTypes.array
}

RestGetSearchComponent.defaultProps = {
}

export default RestGetSearchComponent;  
